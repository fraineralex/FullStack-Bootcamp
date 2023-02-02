/* eslint-disable no-undef */
const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
mongoose.set('strictQuery', true)

const connectionString = NODE_ENV === 'test'
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI

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

process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
})