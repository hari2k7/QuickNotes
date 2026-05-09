import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

import './App.css'

function App() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [isLogin, setIsLogin] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //fetch Notes
  const fetchNotes = async () => {

    const token = localStorage.getItem('token')

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/notes`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    )

    //const data = await response.json(); no need since we use axios instead of fetch(...)

    setNotes(response.data);
  }

  useEffect(() => {

    const token = localStorage.getItem('token')

    if (token) {
      setIsAuthenticated(true)
    }

  }, []);

  useEffect(() => {

    if (isAuthenticated) {
      fetchNotes();
    }

  }, [isAuthenticated]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem('token')

    // update note
    if (editId) {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notes/${editId}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

    const token = localStorage.getItem('token');

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  const handleAuth = async (e) => {

    e.preventDefault();

    try {

      // LOGIN
      if (isLogin) {

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            email,
            password,
          }
        );

        localStorage.setItem(
          'token',
          response.data.token
        );

        setIsAuthenticated(true);

        await fetchNotes();
      }

      // REGISTER
      else {

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/register`,
          {
            name,
            email,
            password,
          }
        );

        alert('Registration successful');

        setIsLogin(true);
      }

    } catch (error) {

      console.log(error);

    }
  };

  const logoutUser = () => {

    localStorage.removeItem('token');

    setIsAuthenticated(false);

    setNotes([]);
  };

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text('My Notes', 20, 20);

    let y = 40;


    notes.forEach((note, index) => {

      doc.setFontSize(14);

      doc.text(
        `${index + 1}. ${note.title}`,
        20,
        y
      );

      y += 10;

      doc.setFontSize(12);

      doc.text(
        note.content,
        25,
        y
      );

      y += 20;
    });


    doc.save('notes.pdf');
  };

  return (
    <div className='container'>
      <h1>Quick Notes</h1>

      {
        !isAuthenticated && (

          <form onSubmit={handleAuth}>

            {
              !isLogin && (
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )
            }

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              {isLogin ? 'Login' : 'Register'}
            </button>

            <p
              onClick={() => setIsLogin(!isLogin)}
              style={{ cursor: 'pointer' }}
            >
              {
                isLogin
                  ? 'Create new account'
                  : 'Already have an account?'
              }
            </p>

          </form>
        )
      }

      {
        isAuthenticated && (
          <>
            {
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
            }
            {
              <div className='notes-grid'>
                {
                  notes.map((note) => (
                    <div className='note-card' key={note._id}>
                      <h3>{note.title}</h3>
                      <p>{note.content}</p>

                      <div className="card-buttons">
                        <button onClick={() => deleteNote(note._id)}>Delete</button>

                        <button onClick={() => handleEdit(note)}>Edit</button>
                      </div>

                    </div>
                  ))
                }
              </div>
            }
          </>
        )
      }

      {
        isAuthenticated && (
          <>
            <button onClick={exportPDF}>Export PDF</button>
            <button onClick={logoutUser}>Logout</button>
          </>
        )
      }

    </div>
  );
}

export default App;