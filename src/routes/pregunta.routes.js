const { Router } = require('express')
const router = Router()
const { requireAdmin } = require('../middlewares/requireAdmin')
const { requireLogin } = require('../middlewares/requireLogin')
const pregCtrl = require('../controllers/pregunta.controller')

router.get('/getbytemaid/:id', requireLogin, pregCtrl.getPregByTemaId)

router.get('/getallpregunta', requireLogin, pregCtrl.getAllPregunta)

router.post('/', requireAdmin, pregCtrl.createPregunta)

router.delete('/:id', requireAdmin, pregCtrl.deletePregunta)

router.put('/:id', requireAdmin, pregCtrl.updatePregunta)

module.exports = router