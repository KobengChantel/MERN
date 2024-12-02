import express from 'express';
import Note from '../models/Note.js';
import middleware from '../middleware/middleware.js'

const router = express.Router();

router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description} = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }


    // Create a new note
    const newNote = new Note({
      title,
      description,
      userId: req.user.id
     
    });

    // Save the new note to the database
    await newNote.save();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Note created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Error adding note", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get('/', async (req, res) =>{
  try{
    const notes = await Note.find()
    return res.status(200).json({success: true, notes})
  }catch(error){
    return res.status(500).json({success: false, message: "can't retrive"})
  }
});

router.put("./:id", async (req,res) => {
  try {
    const {id} = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body)

    return res.status(200).json({success: true, updateNote})
  }catch(error){
    return res.status(500).json({success: false, message: "can't updateNote"})
  
  }
})

export default router;