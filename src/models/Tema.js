const mongoose = require('mongoose')

const temaSchema = mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    bgColor: {
        type: String
    }
}, { versionKey: false })

module.exports = mongoose.model('Tema', temaSchema)