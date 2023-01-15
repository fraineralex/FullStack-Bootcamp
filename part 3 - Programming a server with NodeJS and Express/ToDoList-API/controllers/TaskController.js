/* eslint-disable no-unused-vars */
const Task = require('../models/Task')

//Home controllers
exports.GetHome = async (req, res) => {

    res.send('<h1>Welcome to ToDoList API</h1>')
}

/* Finding all the tasks that belong to the user and then mapping them to the tasks
 variable and Rendering the home page. */
exports.GetTasks = async (req, res) => {
    const tasks = await Task.find({})

    res.json(tasks)
}

/* This is a function that create a new task in the database and rending to home page*/
exports.GetTaskById = async (req, res, next) => {
    const id = req.params.id

    if(id.lenht !== 24){
        return res.status(400).send({error: 'the id argument must be a string of 12 bytes or a string of 24 hex characters or an integer'})
    }

    try{
        const task = await Task.findById(id)
        if(!task){
            res.status(404).end()
        }
        else {
            res.status(200).json(task)
        }
    }
    catch (error) {
        res.status(500).end()
    }
}

exports.CreateTask = async (req, res, next) => {
    console.log(req.body)
    const { content, isCompleted } = req.body

    if (!content) {
        return res.status(400).json({
            error: 'required "content" field is missing'
        })
    }

    const task = new Task({
        content: content,
        date: new Date(),
        isCompleted: isCompleted || false
    })

    try {
        const savedTask = await task.save()
        res.status(201).json(savedTask)
    }
    catch(err) {
        res.status(500).end()
    }
}


/* This is a function that is being used to delete a task from the database. */
exports.DeleteTask = async (req, res) => {
    const id = req.params.id

    try{

        const isDeleted = await Task.findByIdAndDelete(id)

        if (!isDeleted) return res.status(404).send({error: 'Task not found in the system'})

        res.status(204).end()

    }
    catch (error){
        res.status(500).end()
    }
  
}

/* This is a function that is being used to update the content of a task in the database. */
exports.EditTask = async (req, res, next) => {
    const { content, isCompleted } = req.body
    const { id } = req.params

    /* This is a validation that is being done to make sure that the user is not submitting an empty task. */
    if (!content && !isCompleted) {
        return res.status(400).send({
            error: 'is required send "content" or "isCompleted" fields for update the task'
        })
    }

    const task = {
        content: content,
        isCompleted: isCompleted
    }

    try{
        const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true })
        res.status(200).json(updatedTask)
    }
    catch (error){
        res.status(500).end()
    }

}