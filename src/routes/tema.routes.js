const { Router } = require('express') 
const router = Router()
const Tema = require('../models/Tema')
const { requireAdmin } = require('../middlewares/requireAdmin')
const { requireLogin } = require('../middlewares/requireLogin')

router.get('/getalltheme', requireLogin, async (req, res) => {
    try {
        let temas = await Tema.find()
        return res.status(200).json({ok: true, data: temas})
    } catch (error) {
        console.log(error)
    }
})

router.post('/', requireAdmin, async (req, res) => {
    const { title, desc, bgColor } = req.body
    try {
        let tema = await Tema.findOne({title})

        if (tema) return res.status(400).json({ok: false, msg: 'ese tema ya existe'})

        tema = new Tema({
            title,
            desc, 
            bgColor
        })
        await tema.save()
        return res.status(201).json({ok: true, data: tema})

    } catch (error) {
        console.log(error)
    }
})

module.exports = router