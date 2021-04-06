const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
    tema: {
        ref: 'Tema',
        type: mongoose.Schema.Types.ObjectId
    },
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    score: {
        type: Number
    }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Score', scoreSchema)