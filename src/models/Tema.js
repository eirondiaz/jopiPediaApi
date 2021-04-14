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

temaSchema.pre('remove', async function (next) {
    await mongoose.model('Pregunta').deleteMany({tema: this._id})
    next()
})

module.exports = mongoose.model('Tema', temaSchema)