/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Importing all the required modules.
require('dotenv').config()
require('./database/mongo')

const express = require('express')
const errorManager = require('./middlewares/ErrorManager')
const taskRouter = require('./routes/taskRouter')
const cors = require('cors')
//const Task = require('./models/Task')


// Initialize express app
const app = express()

app.use(cors())
app.use(express.json())

//routes
app.use(taskRouter)
app.use(errorManager.ErrorManager)

//launches the server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
