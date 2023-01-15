/* Importing the express module, the taskController module, the isAuth module, and creating a router. */
const express = require('express')
const taskController = require('../controllers/TaskController')
const router = express.Router()

//Home routes
router.get('/', taskController.GetHome)
router.get('/api/tasks', taskController.GetTasks)
router.get('/api/tasks/:id', taskController.GetTaskById)
router.post('/api/tasks/', taskController.CreateTask)
router.delete('/api/tasks/:id', taskController.DeleteTask)
router.put('/api/tasks/:id', taskController.EditTask)

module.exports = router