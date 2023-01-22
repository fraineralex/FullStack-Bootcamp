const { server } = require('../app')
const mongoose = require('mongoose')
const Task = require('../models/Task')
const { initialTasks, api, getAllContentFromTasks } = require('./helpers')



beforeEach(async () => {
    await Task.deleteMany({})

    const task1 = new Task(initialTasks[0])
    await task1.save()

    const task2 = new Task(initialTasks[1])
    await task2.save()


})

test('tasks are returned as json', async () => {
    await api
        .get('/api/tasks')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two tasks', async () => {
    const response = await api.get('/api/tasks')
    expect(response.body).toHaveLength(initialTasks.length)
})

test('the first task is about development', async () => {
    const {content} = await getAllContentFromTasks()
    expect(content).toContain('Learning full stack development')
})

test('A valid task can be added', async () => {
    const newTask = {
        content: 'New task from tasks.test.js',
        isCompleted: true
    }

    await api
        .post('/api/tasks')
        .send(newTask)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const { content, response } = await getAllContentFromTasks()
    expect(content).toContain(newTask.content)
    expect(response.body).toHaveLength(initialTasks.length + 1)
})

test('task without content is not added', async () => {
    const newTask = {
        isCompleted: true
    }

    await api
        .post('/api/tasks')
        .send(newTask)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/tasks')
    expect(response.body).toHaveLength(initialTasks.length)
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})