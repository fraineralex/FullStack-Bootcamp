const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
    content: String,
    date: Date,
    isCompleted: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
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