import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware for checking JWT and authenticating users
const middleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    // If no token is provided, respond with an unauthorized error
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized, token missing' });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'somesupersecretkey');  // Use env var for the secret key

    // If the token is invalid or expired, respond with an error
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Find the user based on the decoded token ID
    const user = await User.findById(decoded.id);

    // If the user is not found, return a 'user not found' error
    if (!user) {
      return res.status(404).json({ success: false, message: 'No user found with this ID' });
    }

    // Attach user details to the request object
    const newUser = { name: user.name, id: user._id };  // Use decoded.id to ensure correct mapping

    // Pass user data to the next middleware
    req.user = newUser;
    next();

  } catch (error) {
    // Catch any errors during token verification or user retrieval and respond with a server error
    console.error('Authentication Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error, please try again' });
  }
};

export default middleware;
