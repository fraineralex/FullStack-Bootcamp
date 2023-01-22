/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken')
const Task = require('../models/Task')
const User = require('../models/User')
const taskRouter = require('express').Router()
const userExtractor = require('../middlewares/userExtractor')

//Home controllers
taskRouter.get('/', async (request, response) => {

    response.send('<h1>Welcome to ToDoList API</h1>')
})

/* Finding all the tasks that belong to the user and then mapping them to the tasks
 variable and Rendering the home page. */
taskRouter.get('', async (request, response) => {
    const tasks = await Task.find({}).populate('user', {
        username: 1,
        name: 1
    })
    response.json(tasks)
})

/* This is a function that create a new task in the database and rending to home page*/
taskRouter.get('/:id', async (request, response, next) => {
    const id = request.params.id

    if(id.length !== 24) {
        response.status(400).send({
            error: 'the id argument must be a string of 12 bytes or a string of 24 hex characters or an integer'})
    }

    try{
        const task = await Task.findById(id)

        if(!task) return response.status(404).end()
        response.status(200).json(task)
    }
    catch (error) {
        next(error)
    }
})

taskRouter.post('/', userExtractor, async (request, response, next) => {
    const { content, isCompleted } = request.body
    const { userId } = request

    if (!content) {
        return response.status(400).json({
            error: 'required "content" field is missing'
        })
    }
    
    const user = await User.findById(userId)

    const task = new Task({
        content: content,
        date: new Date(),
        isCompleted: isCompleted || false,
        user: user._id
    })

    try {
        const savedTask = await task.save()
        user.tasks = user.tasks.concat(savedTask._id)
        await user.save()

        response.status(201).json(savedTask)
    }
    catch(err) {
        next(err)
    }
})


/* This is a function that is being used to delete a task from the database. */
taskRouter.delete('/:id', userExtractor, async (request, response, next) => {
    const id = request.params.id

    if(id.length !== 24) {
        response.status(400).send({
            error: 'the id argument must be a string of 12 bytes or a string of 24 hex characters or an integer'})
    }

    try{

        const isDeleted = await Task.findByIdAndDelete(id)

        if (!isDeleted) return response.status(404).send({error: 'Task not found in the system'})

        response.status(204).end()

    }
    catch (error){
        next(error)
    }
  
})

/* This is a function that is being used to update the content of a task in the database. */
taskRouter.put('/:id', userExtractor, async (request, response, next) => {
    const { content, isCompleted } = request.body
    const { id } = request.params

    if(id.length !== 24) {
        response.status(400).send({
            error: 'the id argument must be a string of 12 bytes or a string of 24 hex characters or an integer'})
    }

    /* This is a validation that is being done to make sure that the user is not submitting an empty task. */
    if (!content && !isCompleted) {
        return response.status(400).send({
            error: 'is required send "content" or "isCompleted" fields for update the task'
        })
    }

    const task = {
        content: content,
        isCompleted: isCompleted
    }

    try{
        const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true })
        response.status(200).json(updatedTask)
    }
    catch (error){
        next(error)
    }

})

module.exports = taskRouter