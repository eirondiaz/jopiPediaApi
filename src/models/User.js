const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    usuario: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    repeatPassword: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)