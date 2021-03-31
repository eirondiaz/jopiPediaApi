const mongoose = require('mongoose')

const preguntaSchema = mongoose.Schema({
    
}, { versionKey: false })

module.exports = mongoose.model('Pregunta', preguntaSchema)