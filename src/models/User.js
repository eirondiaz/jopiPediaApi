const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    lName: {
        type: String
    },
    user: {
        type: String
    },
    email: {
        type: String
    },
    pass: {
        type: String
    },
    rPass: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    foto: {
        type: String
    },
    fans: [
        {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        }
    ]
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)