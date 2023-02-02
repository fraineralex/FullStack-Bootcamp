import Note from './Note'

const RenderCreateNoteForm = ({addNote, newNote, notesToShow, handleNoteChange, toggleImportanceOf }) => (
    <div>
      <form onSubmit={addNote}>
        <input 
        placeholder='Write your note'
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <ul>
        {notesToShow.map((note, i) => 
          <Note
          key={i}
          note={note} 
          toggleImportance = {() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
  </div>
  )

export default RenderCreateNoteForm