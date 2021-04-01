const { Router } = require('express')
const router = Router()
const Pregunta = require('../models/Pregunta')
const Tema = require('../models/Tema')
const { requireAdmin } = require('../middlewares/requireAdmin')
const { requireLogin } = require('../middlewares/requireLogin')

router.get('/getbytemaid/:id', requireLogin, async (req, res) => {
    try {
        const preguntas = await Pregunta.find({tema: req.params.id}).populate('tema')
        return res.status(200).json({ok: true, data: preguntas})
    } catch (error) {
        return res.status(500).json({error})
    }
})

router.get('/getallpregunta', requireLogin, async (req, res) => {
    try {
        const preguntas = await Pregunta.find().populate('tema')
        return res.status(200).json({ok: true, data: preguntas})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})

router.post('/', requireAdmin, async (req, res) => {
    const { desc, respuestas, tema } = req.body
    try {
        let temaFind = await Tema.findOne({_id: tema})

        if (!temaFind) return res.status(404).json({ok: false, msg: 'tema no encontrado'})

        if (respuestas.length !== 4) res.status(400).json({ok: false, msg: 'debe haber 4 respuestas'})

        let pregunta = new Pregunta({
            desc,
            respuestas,
            tema
        })
        await pregunta.save()
        return res.status(201).json({ok: true, data: pregunta})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})

router.delete('/id', requireAdmin, async (req, res) => {
    try {
        const preguntaDeleted = await Pregunta.findByIdAndDelete(req.params.id)

        if (!preguntaDeleted) return res.status(404).json({ok: false, msg: 'pregunta no encontrada'})

        return res.status(200).json({ok: true, data: preguntaDeleted})
    } catch (error) {
        return res.status(500).json({error})
    }
})

router.put('/:id', requireAdmin, async (req, res) => {
    try {
        const pregUpdated = await Pregunta.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('tema')

        if (!pregUpdated) return res.status(400).json({ok: false, msg: 'ha ocurrido un error'})

        return res.status(200).json({ok: false, data: pregUpdated})
    } catch (error) {
        return res.status(500).json({error})
    }
})

module.exports = router