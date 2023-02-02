/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import RenderCreateNoteForm from './components/RenderCreateNotesForm'
import RenderLoginForm from './components/RenderLoginForm'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,

    }

    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, importnat: !note.important }

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)   
    })
  }

  const handleNoteChange = (event) => {
    event.preventDefault()
    
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username,
        password
      })

      console.log(user)

      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
    }
  }

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        user
          ? <RenderCreateNoteForm
              addNote={addNote}
              newNote={newNote}
              notesToShow={notesToShow}
              handleNoteChange={handleNoteChange}
              toggleImportanceOf={toggleImportanceOf}
            />
          : <RenderLoginForm
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
      }
    </div>

  )
}

export default App;
