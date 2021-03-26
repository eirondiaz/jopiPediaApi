const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.get('/', async (req, res) => {
    //const p =await User.find() 
    res.status(200).json({prueba: true})
})

router.post('/register', async (req, res) => {
    const { name, lName, email, pass, rPass, user } = req.body
    try {
        let usern = await User.findOne({email})
        let userq = await User.findOne({user})

        if (usern) res.status(400).json({ok: false, msg: 'correo repetido'})
        if (userq) res.status(400).json({ok: false, msg: 'usuario en uso'})
        if (pass !== rPass) res.status(400).json({ok: false, msg: 'las contraseñas no coinciden'})
        
        let hashed_pass = await bcrypt.hash(pass, 10)
        usern = new User({
            name,
            lName,
            user,
            email,
            pass: hashed_pass
        })
        await user.save()
        res.status(201).json({ok: true, data: usern})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router