const supertest = require('supertest')
const { app, server } = require('../app')
const moongose = require('mongoose')

const api = supertest(app)

test('tasks are returned as json', async () => {
    await api
        .get('/api/tasks')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    moongose.Connection.close()
    server.close()
})