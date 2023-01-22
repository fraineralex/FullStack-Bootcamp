const uniqueValidator = require('mongoose-unique-validator')
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    name: String,
    passwordHash: String,
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User