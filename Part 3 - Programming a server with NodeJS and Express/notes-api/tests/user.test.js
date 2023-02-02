const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api, getUsers } = require('./helpers')

describe('creating a new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('1234', 1)
        
        const user = new User({
            username: 'alex', name:'Alexander', passwordHash: passwordHash
        })

        await user.save()
    })

    test('works as expected creating a fresh username', async () => {
        const userAtStart = await getUsers()

        //const passwordHash = await bcrypt.hash('1234', 1)
        const newUser = {
            username: 'frainer',
            name:'Frainer', 
            password: '1234'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await getUsers()

        expect(userAtEnd).toHaveLength(userAtStart.length + 1)

        const usernames = userAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)

    })

    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await getUsers()

        const newUser = {
            username: 'alex',
            name: 'Frainer',
            password: '1234'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        expect(result.body.errors.username.message).toContain('`username` to be unique')

        const usersAtEnd = await getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)



    })
})