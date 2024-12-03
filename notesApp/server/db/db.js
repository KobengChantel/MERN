import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    // Use your environment variable for sensitive data like the MongoDB URI
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://note:note@noteapp.juw7m.mongodb.net/?retryWrites=true&w=majority&appName=noteApp"; 

    // Attempt to connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,      // Make sure we use the new URL parser
      useUnifiedTopology: true,   // Ensure we use the unified topology (newer behavior)
    });

    // Log success message if the connection is successful
    console.log("Connected to MongoDB");

  } catch (error) {
    // Log error message if connection fails
    console.log("Error connecting to MongoDB:", error.message);
  } finally {
    // Log attempt to connect regardless of success or failure
    console.log("MongoDB connection attempt finished.");
  }
};

// Export the function for use in other parts of the application
export default connectToMongoDB;
