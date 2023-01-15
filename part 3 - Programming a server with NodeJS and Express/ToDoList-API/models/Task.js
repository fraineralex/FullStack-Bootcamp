const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
    content: String,
    date: Date,
    isCompleted: Boolean
})

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Task = model('Task', taskSchema)

module.exports = Task

/* Task.find({})
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err => {
        console.error(err)
    }) */

/* const task = new Task({
    content: 'MongoDb is incredible!',
    date: new Date(),
    isCompleted: false
})

task.save()
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err => {
        console.error(err)
    }) */
