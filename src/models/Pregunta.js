const mongoose = require('mongoose')

const preguntaSchema = mongoose.Schema({
    desc: {
        type: String
    },
    respuestas: [{
        desc: String,
        correcta: Boolean
    }],
    tema: {
        ref: 'Tema',
        type: mongoose.Schema.Types.ObjectId
    }
}, { versionKey: false })

module.exports = mongoose.model('Pregunta', preguntaSchema)