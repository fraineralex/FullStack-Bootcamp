const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('tasks', {
        content: 1,
        date: 1,
        isCompleted: 1
    })
    response.json(users)
})


userRouter.post('/', async (request, response) => {

    try {
        const { body } = request
        const { username, name, password } = body
    
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username,
            name,
            passwordHash: passwordHash
        })
    
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        response.status(400).json(error)
    }
   
})

module.exports = userRouter