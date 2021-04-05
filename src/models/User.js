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
    puntuaciones: [
        {
            tema: {
                ref: 'Tema',
                type: mongoose.Schema.Types.ObjectId
            },
            score: {
                type: Number
            }
        }
    ],
    foto: {
        type: String
    }
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)