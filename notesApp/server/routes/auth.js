import express from 'express';
import User from '../models/User.js';  // Import the User model (make sure the path is correct)
import bcrypt from 'bcrypt';         // Import bcrypt for password hashing
import jwt from 'jsonwebtoken';      // Import JWT for creating tokens
import middleware from '../middleware/middleware.js';  // Import the middleware for verifying JWT

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body; // Destructure the fields from the request body

    // Check if the user already exists in the database by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Hash the password before saving it (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User instance with the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,  // Save the hashed password, not plain text
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a success response with user details (but no password)
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ success: false, message: 'Wrong credentials' });
    }

    // Create a JWT token (store user id in the payload) with expiration time of 5 hours
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "somesupersecretkey", { expiresIn: "5h" });

    // Send the response with the token and user details (without the password)
    return res.status(200).json({
      success: true,
      token,  // Send the JWT token to the client
      user: { name: user.name, email: user.email },  // Send the user details (excluding password)
      message: "Login successful",
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ success: false, message: 'Error in server' });
  }
});

// Verify Route (Protected Route)
router.get('/verify', middleware, async (req, res) => {
  // This route is protected by the middleware to ensure the user is authenticated
  return res.status(200).json({ success: true, user: req.user });
});

export default router;
