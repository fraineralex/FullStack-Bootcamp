const supertest = require('supertest')
const User = require('../models/User')
const { app } = require('../app')

const api = supertest(app)

const initialNotes = [
    {
        content: 'Learning full stack development',
        isCompleted: false,
        date: new Date()

    },
    {
        content: 'I will a pro in React, NEXT.js, Typescript and GraphQL',
        isCompleted: false,
        date: new Date()

    }
]

const getAllContentFromNotes = async () => {
    const response = await api.get('/api/notes')
    const content = response.body.map(note => note.content)
    return {content, response}
}

const getUsers = async () => {
    const usersDB = await User.find({})
    const userAtStart = usersDB.map(user => user.toJSON())
    return userAtStart
}

module.exports = {
    initialNotes,
    api,
    getAllContentFromNotes,
    getUsers
}