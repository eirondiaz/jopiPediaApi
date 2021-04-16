const Tema = require('../models/Tema')

// @desc      obtener todos los temas
// @route     GET /api/tema/getalltheme
// @access    private
const getAllTema = async (req, res) => {
    try {
        let temas = await Tema.find()
        return res.status(200).json({ok: true, data: temas})
    } catch (error) {
        return res.status(500).json({error})
    }
}

// @desc      obtener tema por id
// @route     GET /api/tema/getthemebyid/:id
// @access    private
const getTemaById = async (req, res) => {
    try {
        const theme = await Tema.findOne({_id: req.params.id})

        if (!theme) return res.status(404).json({ok: false, msg: 'tema no encontrado'})

        return res.status(200).json({ok: true, data: theme})
    } catch (error) {
        return res.status(500).json({error})
    }
}

// @desc      crear tema
// @route     POST /api/tema
// @access    private
const createTema = async (req, res) => {
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
        return res.status(500).json({error})
    }
}

// @desc      eliminar tema
// @route     DELETE /api/tema/:id
// @access    private
const deleteTema = async (req, res) => {
    try {
        const deletedTheme = await Tema.findById(req.params.id)

        if (!deletedTheme) return res.status(404).json({ok: false, msg: 'tema no encontrado'})

        await deletedTheme.remove()

        return res.status(200).json({ok: true, data: deletedTheme})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
}

// @desc      actualizar tema
// @route     PUT /api/tema/:id
// @access    private
const updateTema = async (req, res) => {
    try {
        let updatedTheme = await Tema.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!updatedTheme) return res.status(404).json({ok: false, msg: 'tema no encontrado'})

        return res.status(200).json({ok: true, data: updatedTheme})
    } catch (error) {
        return res.status(500).json({error})
    }
}

module.exports = {
    getAllTema,
    getTemaById,
    createTema,
    deleteTema,
    updateTema
}