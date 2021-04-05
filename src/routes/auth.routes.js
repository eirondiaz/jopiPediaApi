const { Router } = require('express')
const router = Router()
const { requireLogin } = require('../middlewares/requireLogin')
const authCtrl = require('../controllers/auth.controller')

router.post('/register', authCtrl.register)

router.post('/login', authCtrl.login)

router.get('/getdata', requireLogin, authCtrl.getUserData)

module.exports = router