const { model, Schema } = require('mongoose')

const noteSchema = new Schema({
    content: String,
    date: Date,
    isImportant: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Note = model('Note', noteSchema)

module.exports = Note