const { Router } = require('express')
const router = Router()
const { requireLogin } = require('../middlewares/requireLogin')
const restCtlr = require('../controllers/restriccion.controller')

router.get('/', requireLogin, restCtlr.getRestCurrentUser)

router.get('/:username', restCtlr.getRestByUsername)

router.get('/getbytema/:tema', requireLogin, restCtlr.getRestByTemaId)

router.post('/', requireLogin, restCtlr.createRest)


module.exports = router