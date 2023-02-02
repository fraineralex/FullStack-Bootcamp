/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const bycrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
    const { body } = request
    const { username, password } = body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bycrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        response.status(401).json({
            error: 'invalid user or password'
        })
    }

    const userForToken = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {
            expiresIn: (60 * 60 * 24 * 7) // ==> to expire in a week
        }
    )

    response.send({
        name: user.name,
        username: user.username,
        token
    })
})

module.exports = loginRouter