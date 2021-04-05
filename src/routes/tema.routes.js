const { Router } = require('express') 
const router = Router()
const { requireAdmin } = require('../middlewares/requireAdmin')
const { requireLogin } = require('../middlewares/requireLogin')
const temaCtrl = require('../controllers/tema.controller')

router.get('/getalltheme', requireLogin, temaCtrl.getAllTema)

router.get('/getthemebyid/:id', requireLogin, temaCtrl.getTemaById)

router.post('/', requireAdmin, temaCtrl.createTema)

router.delete('/:id', requireAdmin, temaCtrl.deleteTema)

router.put('/:id', requireAdmin, temaCtrl.updateTema)

module.exports = router