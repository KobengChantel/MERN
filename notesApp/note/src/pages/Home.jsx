import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { toast } from 'react-toastify';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);  // Modal visibility state
  const [filteredNotes, setFilteredNotes] = useState([]);  // Filtered notes based on search query
  const [notes, setNotes] = useState([]);  // All notes fetched from backend
  const [currentNote, setCurrentNote] = useState(null);  // Current note being edited
  const [query, setQuery] = useState('');  // Search query state

  // Fetch notes from the server when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Update filtered notes whenever search query or all notes change
  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||  // Search by title
        note.description.toLowerCase().includes(query.toLowerCase())  // Search by description
      )
    );
  }, [query, notes]);

  // Function to fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/note', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Passing token in header for auth
        },
      });
      setNotes(data.notes);  // Set the notes in state
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Function to close the modal and reset the current note
  const closeModal = () => {
    setModalOpen(false);  // Close the modal
    setCurrentNote(null);  // Reset current note
  };

  // Function to set the current note for editing and open the modal
  const onEdit = (note) => {
    setCurrentNote(note);  // Set the current note
    setModalOpen(true);  // Open the modal for editing
  };

  // Function to add a new note
  const addNote = async (title, description) => {
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/note/add',  // POST request to add a new note
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Authorization header
          },
        }
      );

      if (response.data.success) {
        fetchNotes();  // Refresh the list of notes
        closeModal();  // Close the modal
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Function to delete a note by its ID
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,  // DELETE request to remove the note
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Authorization header
          },
        }
      );

      if (response.data.success) {
        toast.success('Note deleted');  // Show success toast
        fetchNotes();  // Refresh the list of notes
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Function to edit a note
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,  // PUT request to update the note
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Authorization header
          },
        }
      );

      if (response.data.success) {
        fetchNotes();  // Refresh the list of notes
        closeModal();  // Close the modal
      }
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <div className='bg-pink-100 min-h-screen'>
      {/* Navbar Component with search query handler */}
      <Navbar setQuery={setQuery} />

      {/* Display notes in a grid layout */}
      <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {filteredNotes.length > 0 ? (
          // Display filtered notes
          filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} onEdit={onEdit} deleteNote={deleteNote} />
          ))
        ) : (
          <p>No notes</p>  // Display message if no notes available
        )}
      </div>

      {/* Button to open the modal for adding a new note */}
      <button
        onClick={() => setModalOpen(true)}
        className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'
      >
        +
      </button>

      {/* Display the modal if isModalOpen is true */}
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}  // Pass editNote function to modal
          deleteNote={deleteNote}  // Pass deleteNote function to modal
        />
      )}
    </div>
  );
};

export default Home;
 