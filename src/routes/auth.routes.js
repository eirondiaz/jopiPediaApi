const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.get('/', async (req, res) => {
    //const p =await User.find() 
    res.status(200).json({prueba: true})
})

router.post('/register', async (req, res) => {
    const { nombre, apellido, email, password, repeatPassword, usuario } = req.body
    try {
        let user = await User.findOne({email})
        let userq = await User.findOne({usuario})

        if (user) res.status(400).json({ok: false, msg: 'correo repetido'})
        if (userq) res.status(400).json({ok: false, msg: 'usuario en uso'})
        if (password !== repeatPassword) res.status(400).json({ok: false, msg: 'las contraseñas no coinciden'})
        
        let hashed_pass = await bcrypt.hash(password, 10)
        user = new User({
            nombre,
            apellido,
            usuario,
            email,
            password: hashed_pass
        })
        await user.save()
        res.status(201).json({ok: true, data: user})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router