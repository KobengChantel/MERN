import mongoose from 'mongoose';

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,  // The name is a string
    required: true  // Name is required for the user
  },

  email: {
    type: String,   // The email is a string
    required: true,  // Email is required for the user
    unique: true     // Ensure the email is unique in the database
  },

  password: { 
    type: String,   // The password is a string
    required: true  // Password is required for the user
  },
});

// Create the User model based on the schema
const User = mongoose.model('User', UserSchema);

// Export the User model so it can be used in other parts of the app
export default User;
