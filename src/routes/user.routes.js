const { Router } = require('express') 
const router = Router()
const { requireLogin } = require('../middlewares/requireLogin')
const User = require('../models/User')

router.get('/', requireLogin, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        return res.status(200).json({ok: true, user})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router