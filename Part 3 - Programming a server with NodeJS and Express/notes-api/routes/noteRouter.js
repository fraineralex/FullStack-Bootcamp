/* Importing the express module, the noteController module, the isAuth module, and creating a router. */
const noteRouter = require('express').Router()
const noteController = require('../controllers/notes')

//Home routes
noteRouter.get('/', noteController.GetHome)
noteRouter.get('/api/notes', noteController.GetNotes)
noteRouter.get('/api/notes/:id', noteController.GetNoteById)
noteRouter.post('/api/notes/', noteController.CreateNote)
noteRouter.delete('/api/notes/:id', noteController.DeleteNote)
noteRouter.put('/api/notes/:id', noteController.EditNote)

module.exports = noteRouter