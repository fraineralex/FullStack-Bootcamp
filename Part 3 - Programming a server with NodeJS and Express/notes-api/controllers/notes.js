/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken')
const Note = require('../models/Note')
const User = require('../models/User')
const noteRouter = require('express').Router()
const userExtractor = require('../middlewares/userExtractor')

//Home controllers
noteRouter.get('/home', async (request, response) => {

    response.send('<h1>Welcome to ToDoList API</h1>')
})

/* Finding all the notes that belong to the user and then mapping them to the notes
 variable and Rendering the home page. */
noteRouter.get('/', async (request, response) => {
    const notes = await Note.find({}).populate('user', {
        username: 1,
        name: 1
    })
    response.json(notes)
})

/* This is a function that create a new note in the database and rending to home page*/
noteRouter.get('/:id', async (request, response, next) => {
    const id = request.params.id

    if(id.length !== 24) {
        response.status(400).send({
            error: 'the id argument must be a string of 12 bytes or a string of 24 hex characters or an integer'})
    }

    try{
        const note = await Note.findById(id)

        if(!note) return response.status(404).end()
        response.status(200).json(note)
    }
    catch (error) {
        next(error)
    }
})

noteRouter.post('/', userExtractor, async (request, response, next) => {
    const { content, isImportant } = request.body
    const { userId } = request

    if (!content) {
        return response.status(400).json({
            error: 'required "content" field is missing'
        })
    }
    
    const user = await User.findById(userId)

    const note = new Note({
        content: content,
        date: new Date(),
        isImportant: isImportant || false,
        user: user._id
    })

    try {
        const savedNote = await note.save()
        user.notes = user.notes.concat(savedNote._id)
        await user.save()

        response.status(201).json(savedNote)
    }
    catch(err) {
        next(err)
    }
})


/* This is a function that is being used to delete a note from the database. */
noteRouter.delete('/:id', userExtractor, async (request, response, next) => {
    const id = request.params.id

    if(id.length !== 24) {
        response.status(400).send({
            error: 'the id argument must be a string of 12 bytes or a string of 24 hex characters or an integer'})
    }

    try{

        const isDeleted = await Note.findByIdAndDelete(id)

        if (!isDeleted) return response.status(404).send({error: 'Note not found in the system'})

        response.status(204).end()

    }
    catch (error){
        next(error)
    }
  
})

/* This is a function that is being used to update the content of a note in the database. */
noteRouter.put('/:id', userExtractor, async (request, response, next) => {
    const { content, isImportant } = request.body
    const { id } = request.params

    if(id.length !== 24) {
        response.status(400).send({
            error: 'the id argument must be a string of 12 bytes or a string of 24 hex characters or an integer'})
    }

    /* This is a validation that is being done to make sure that the user is not submitting an empty note. */
    if (!content && !isImportant) {
        return response.status(400).send({
            error: 'is required send "content" or "isImportant" fields for update the note'
        })
    }

    const note = {
        content: content,
        isImportant: isImportant
    }

    try{
        const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true })
        response.status(200).json(updatedNote)
    }
    catch (error){
        next(error)
    }

})

module.exports = noteRouter