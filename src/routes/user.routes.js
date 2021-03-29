const { Router } = require('express') 
const router = Router()
const { requireLogin } = require('../middlewares/requireLogin')
const User = require('../models/User')

router.get('/', requireLogin, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id}).select('-pass')
        return res.status(200).json({ok: true, user})
    } catch (error) {
        console.log(error)
    }
})

router.put('/', requireLogin, async (req, res) => {
    try {
        let _user = await User.findByIdAndUpdate(req.user.id, req.body)
        if (!_user) return res.status(400).json({ok: false, msg: 'error'})
        
        _user = await User.findOne({_id: req.user.id}).select('-pass')
        return res.status(200).json({ok: true, data: _user})
    } catch (error) {
        console.log(error)
    }
})

router.get('/getallusers', async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({ok: true, users}).select('-pass')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router