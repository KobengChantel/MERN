import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/ContextProvider';  // Import useAuth hook to check if user is logged in
import { toast } from 'react-toastify';  // Import toast for showing messages

const NoteCard = ({ note, onEdit, deleteNote, addNote }) => {
  const { user } = useAuth();  // Get the logged-in user from context

  // Function to handle editing a note
  const handleEdit = (note) => {
    if (!user) {
      // If user is not logged in, show a toast message prompting them to log in
      toast.info('Please log in or register to update your notes');
    } else {
      // If user is logged in, allow editing the note
      onEdit(note);
    }
  }; 

  // Function to handle deleting a note
  const handleDelete = (id) => {
    if (!user) {
      // If user is not logged in, show a toast message prompting them to log in
      toast.info('Please log in or register to delete your notes');
    } else {
      // If user is logged in, allow deleting the note
      deleteNote(id);
    }
  };

    // Function to handle deleting a note
    const handleAdd = (id) => {
      if (!user) {
        // If user is not logged in, show a toast message prompting them to log in
        toast.info('Please log in or register to create new notes');
      } else {
        // If user is logged in, allow deleting the note
        addNote(id);
      }
    };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p>{note.description}</p>
      <div className="flex justify-end mt-2">
        {/* Button to edit the note */}
        <button
          className="text-blue-500 mr-2"
          onClick={() => handleEdit(note)}  // Trigger handleEdit on click
        >
          <FaEdit />
        </button>
        
        {/* Button to delete the note */}
        <button
          className="text-red-500"
          onClick={() => handleDelete(note._id)}  // Trigger handleDelete on click
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
