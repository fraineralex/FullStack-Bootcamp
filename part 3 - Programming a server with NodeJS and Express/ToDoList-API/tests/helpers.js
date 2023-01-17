const supertest = require('supertest')
const { app } = require('../app')

const api = supertest(app)

const initialTasks = [
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

const getAllContentFromTasks = async () => {
    const response = await api.get('/api/tasks')
    const content = response.body.map(task => task.content)
    return {content, response}
}

module.exports = {
    initialTasks,
    api,
    getAllContentFromTasks
}