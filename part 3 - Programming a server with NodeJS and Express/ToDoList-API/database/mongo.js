/* eslint-disable no-undef */
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const connectionString = process.env.MONGO_DB_URI

//connection to mondodb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected successfully to the database')
    }).catch(err => {
        console.error(err)
    })

process.on('uncaughtException', () => {
    mongoose.connection.disconect()
})