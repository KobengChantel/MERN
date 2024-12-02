import express from 'express';
import User from '../models/User.js'; // Ensure the correct path to the model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return success response
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

    // Compare the provided password with the stored password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ success: false, message: 'Wrong credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, "somesupersecretkey", { expiresIn: "5h" });

    // Return success response with the token
    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
      message: "Login successful",
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ success: false, message: 'Error in server' });
  }
});

export default router;
