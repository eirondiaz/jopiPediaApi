const { Router } = require('express') 
const router = Router()
const { requireLogin } = require('../middlewares/requireLogin')
const userCtrl = require('../controllers/user.controller')


router.get('/', requireLogin, userCtrl.getCurrentUser)

router.put('/', requireLogin, userCtrl.updateUser)

router.get('/getallusers', userCtrl.getAllUsers)

router.get('/:username', requireLogin, userCtrl.getUserByUsername)

module.exports = router