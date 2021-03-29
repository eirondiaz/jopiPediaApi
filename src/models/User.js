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
    }
})

module.exports = mongoose.model('User', userSchema)