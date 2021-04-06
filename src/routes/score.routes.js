const { Router } = require('express')
const router = Router()
const { requireLogin } = require('../middlewares/requireLogin')
const scoreCtrl = require('../controllers/score.controller')

router.get('/', requireLogin, scoreCtrl.getAllScores)

router.get('/scorebyuserid/:id', scoreCtrl.getScoresByUserId)

router.get('/highestscores', scoreCtrl.highestScores)

router.get('/scoresuserlogged', requireLogin, scoreCtrl.getScoresUserLogged)

router.post('/', requireLogin, scoreCtrl.createScore)

module.exports = router