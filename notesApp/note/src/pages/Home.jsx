import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import axios from 'axios';


const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [notes, setNotes] = useState([])

useEffect(() => {
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/notes"); // Added await
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };
  fetchNotes();
}, []);


const closeModal = () => {
  setModalOpen(false)
}

const addNote = async ( title, description)=> {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/note/add",
      { title, description }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
  );

    if (response.data.success) {
      setMessage(response.data.message);
      // navigate('/');
      closeModal()
    }
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      // setError(error.response.data.message || 'An error occurred');
    // } else {
    //   // Network or other errors
    //   setError('Unable to connect to the server. Please try again.');
     }
  }
};


  return (
  <div className='bg-pink-100 min-h-screen'>
    <Navbar/>
    <div>
  {notes.map(note => (
    <NoteCard  note={note} />
  ))}
</div>

<button 
onClick={() => setModalOpen(true)}
className=' fixed right-4 bottom-4 ext-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>
+
</button>

    
    {isModalOpen && <NoteModal
    closeModal={closeModal}
    addNote={addNote}/>}  
    </div>
  )
}


export default Home;