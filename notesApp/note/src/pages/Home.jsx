import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal';
import axios from 'axios';
import NoteCard from '../components/NoteCard';


const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote]
= useState(null)

useEffect(() => {
  fetchNotes();
}, []);

const fetchNotes = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/note"); // Added await
    setNotes(data.notes);
  } catch (error) {
    console.log(error);
  }
};

const closeModal = () => {
  setModalOpen(false)
}

const onEdit = (note) => {
  setCurrentNote(note)
  setModalOpen(true)
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
      // setMessage(response.data.message);
      fetchNotes()
      closeModal()
    }
  } catch (error) {
    if (error.response) {
     
     }
  }
};

const deleteNote = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/note/${id}`,
       {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
  ); 
  if (response.data.success) {
    // setMessage(response.data.message);
    fetchNotes()
    
  }
} catch (error) {
  if (error.response) {
   
   }
}
};


const eidtNote = async (id, title, description) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/note/${id}`,
      { title, description }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
  ); 
  if (response.data.success) {
    // setMessage(response.data.message);
    fetchNotes()
    closeModal()
  }
} catch (error) {
  if (error.response) {
   
   }
}
};


  return (
  <div className='bg-pink-100 min-h-screen'>
    <Navbar/>
    <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
  {notes.map(note => (
    <NoteCard  
    note={note}
    onEdit={onEdit} />
  ))}
</div>

<button 
onClick={() => setModalOpen(true)}
className=' fixed right-4 bottom-4 ext-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>
+
</button>

    
    {isModalOpen && <NoteModal
    closeModal={closeModal}
    addNote={addNote}
    currentNote={currentNote}
    eidtNote={eidtNote}
    deleteNote={deleteNote}
    />}  
    </div>
  )
}


export default Home;