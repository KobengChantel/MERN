import mongoose from 'mongoose';

// Define the Note schema with fields and validation
const NoteSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,  // The title is required for every note
      trim: true       // Ensures no extra spaces around the title
    },
    description: { 
      type: String, 
      required: true,  // The description is required for every note
      trim: true       // Ensures no extra spaces around the description
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',     // Reference to the 'User' model, to associate a user with the note
      required: true   // Each note must be associated with a user
    }
  },
  {
    timestamps: true  // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the Note model based on the schema
const Note = mongoose.model('Note', NoteSchema);

export default Note;
