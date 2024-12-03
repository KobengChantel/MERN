import express from 'express';
import Note from '../models/Note.js';
import middleware from '../middleware/middleware.js';

const router = express.Router();

// Route to add a new note
router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    // Create a new note with the provided data and associate it with the logged-in user
    const newNote = new Note({
      title,
      description,
      userId: req.user.id  // Use userId from the middleware (set during authentication)
    });

    // Save the new note to the database
    const savedNote = await newNote.save();

    // Return success response with the created note
    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: {
        id: savedNote._id,
        title: savedNote.title,
        description: savedNote.description,
      },
    });
  } catch (error) {
    console.error("Error adding note", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Route to get all notes of the logged-in user
router.get('/', middleware, async (req, res) => {
  try {
    // Retrieve notes associated with the user from the database
    const notes = await Note.find({ userId: req.user.id });

    // Return success response with the list of notes
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error retrieving notes", error.message);
    return res.status(500).json({ success: false, message: "Can't retrieve notes" });
  }
});

// Route to update a note by its ID
router.put("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Update the note based on the provided ID and request body
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Return success response with the updated note
    return res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    console.error("Error updating note", error.message);
    return res.status(500).json({ success: false, message: "Can't update note" });
  }
});

// Route to delete a note by its ID
router.delete("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the note by ID
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Return success response with the deleted note's details
    return res.status(200).json({ success: true, message: "Note deleted", note: deletedNote });
  } catch (error) {
    console.error("Error deleting note", error.message);
    return res.status(500).json({ success: false, message: "Can't delete note" });
  }
});

export default router;
