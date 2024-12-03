import React, { useState, useEffect } from 'react';

const NoteModal = ({ closeModal, addNote, currentNote, editNote, deleteNote }) => {
  const [title, setTitle] = useState('');  // State to hold title of the note
  const [description, setDescription] = useState('');  // State to hold description of the note

  // Populate modal fields with the current note data if editing
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);  // Set title for editing
      setDescription(currentNote.description);  // Set description for editing
    }
  }, [currentNote]);  // Runs when currentNote changes

  // Function to handle the form submission (add or edit a note)
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    if (currentNote) {
      // If there's a current note, edit it
      editNote(currentNote._id, title, description);
    } else {
      // Otherwise, add a new note
      addNote(title, description);
    }
  };

  // Function to handle note deletion
  const handleDelete = async () => {
    if (currentNote) {
      // If there's a current note, delete it
      deleteNote(currentNote._id);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center'>
      <div className='bg-white p-8 rounded'>
        {/* Modal Header */}
        <h2 className='text-xl font-bold mb-4'>
          {currentNote ? 'Edit Note' : 'Add New Note'}  {/* Show different title based on currentNote */}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Input field for note title */}
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}  // Update title state on change
            placeholder='Note Title'
            className='border p-2 w-full mb-4'
            required  // Make this field required
          />
          {/* Textarea for note description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}  // Update description state on change
            placeholder='Note Description'
            className='border p-2 w-full mb-4'
            required  // Make this field required
          />
          {/* Submit button for adding or updating the note */}
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            {currentNote ? 'Update Note' : 'Add Note'}  {/* Change text based on currentNote */}
          </button>
        </form>

        {/* Delete button shown only if editing an existing note */}
        {currentNote && (
          <button
            className='mt-4 text-red-500'
            onClick={handleDelete}  // Trigger delete function
          >
            Delete Note
          </button>
        )}

        {/* Cancel button to close the modal */}
        <button className='mt-4 text-red-500' onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
