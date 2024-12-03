import express from 'express';
import cors from 'cors';
import connectToMongoDB from './db/db.js';
import noteRouter from './routes/note.js';
import authRouter from './routes/auth.js';

const app = express();

// Middleware to handle CORS (Cross-Origin Resource Sharing) and allow external API calls
app.use(cors()); // This will allow all origins, you can configure it further for production
app.use(express.json()); // This middleware parses incoming JSON requests

// API routes
app.use('/api/note', noteRouter); // Routes related to notes
app.use('/api/auth', authRouter); // Routes related to authentication

// Starting the server
app.listen(5000, () => {
  // Connect to MongoDB database
  connectToMongoDB()
    .then(() => {
      console.log("Connected to MongoDB"); // Log success when the connection is established
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message); // Handle connection errors
    });

  // Log server start message
  console.log("Server is running on port 5000");
});
