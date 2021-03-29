const { Router } = require('express') 
const router = Router()
const Tema = require('../models/Tema')
const { requireAdmin } = require('../middlewares/requireAdmin')

router.post('/', requireAdmin, async (req, res) => {
    const { title, desc, bgColor } = req.body
    try {
        let tema = await Tema.findOne({title})

        if (title) return res.status(400).json({ok: false, msg: 'ese tema ya existe'})

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