const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    lName: {
        type: String,
        trim: true
    },
    user: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
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
    ],
    restricciones: [
        {
            ref: 'Restriccion',
            type: mongoose.Schema.Types.ObjectId
        }
    ]
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)