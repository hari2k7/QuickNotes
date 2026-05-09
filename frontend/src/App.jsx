import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'

function App() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  //fetch Notes
  const fetchNotes = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/notes`)

    //const data = await response.json(); no need since we use axios instead of fetch(...)

    setNotes(response.data);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();


    // update note
    if (editId) {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notes/${editId}`,
        {
          title,
          content,
        }
      );

      setEditId(null)
    }

    // create / add note
    else {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/notes`,
        {
          title,
          content,
        }
      );
    }

    setTitle('');
    setContent('');

    fetchNotes();
  }

  const deleteNote = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/notes/${id}`
      );
  
      fetchNotes();
    } catch (error) {
      console.log(error)
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditId(note._id)
  }

  return (
    <div className='container'>
      <h1>Quick Notes</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder='Enter title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          id=""
          placeholder='Enter content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <button type='submit' disabled={!title || !content}>
          {editId ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      <hr />

      <div className='notes-grid'>
        {
          notes.map((note) => (
            <div className='note-card' key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>

              <button onClick={() => { deleteNote(note._id) }}>Delete</button>

              <button onClick={() => handleEdit(note)}>Edit</button>

            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;