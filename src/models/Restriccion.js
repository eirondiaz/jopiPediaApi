const mongoose = require('mongoose')

const restriccionSchema = mongoose.Schema({
    tema: {
        ref: 'Tema',
        type: mongoose.Schema.Types.ObjectId
    },
    count: {
        type: Number
    },
    restriccion: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

module.exports = mongoose.model('Restriccion', restriccionSchema)