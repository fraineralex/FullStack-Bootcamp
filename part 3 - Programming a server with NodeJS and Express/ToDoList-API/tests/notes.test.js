const { server } = require('../app')
const mongoose = require('mongoose')
const Note = require('../models/Note')
const { initialNotes, api, getAllContentFromNotes } = require('./helpers')



beforeEach(async () => {
    await Note.deleteMany({})

    const note1 = new Note(initialNotes[0])
    await note1.save()

    const note2 = new Note(initialNotes[1])
    await note2.save()


})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about development', async () => {
    const {content} = await getAllContentFromNotes()
    expect(content).toContain('Learning full stack development')
})

test('A valid note can be added', async () => {
    const newNote = {
        content: 'New note from notes.test.js',
        isCompleted: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const { content, response } = await getAllContentFromNotes()
    expect(content).toContain(newNote.content)
    expect(response.body).toHaveLength(initialNotes.length + 1)
})

test('note without content is not added', async () => {
    const newNote = {
        isCompleted: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})