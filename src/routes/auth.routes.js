const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', async (req, res) => {
    const { name, lName, email, pass, rPass, user } = req.body
    try {
        let usern = await User.findOne({email})
        let userq = await User.findOne({user})

        if (usern) return res.status(400).json({ok: false, msg: 'correo repetido'})
        if (userq) return res.status(400).json({ok: false, msg: 'usuario en uso'})
        if (pass !== rPass) return res.status(400).json({ok: false, msg: 'las contraseñas no coinciden'})
        
        let hashed_pass = await bcrypt.hash(pass, 10)
        usern = new User({
            name,
            lName,
            user,
            email,
            pass: hashed_pass
        })
        await usern.save()
        return res.status(201).json({ok: true, data: usern})
    } catch (error) {
        console.log(error)
    }
})

router.post('/login', async (req, res) => {
    const { email, pass } = req.body
    try {
        let user = await User.findOne({email})
        if (!user) return res.status(404).json({ok: false, msg: 'correo invalido'})
        
        const isMatch = await bcrypt.compare(pass, user.pass)

        if (!isMatch) return res.status(400).json({ok: false, msg: 'las contraseñas no coinciden'})

        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET || 'secretKey')
        return res.status(200).json({ok: true, token})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router