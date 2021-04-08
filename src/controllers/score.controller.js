const Score = require('../models/Score')
const Tema = require('../models/Tema')
const User = require('../models/User')

const getAllScores = async (req, res) => {
    try {
        let scores = await Score.find()
            .populate(
                {path: 'tema', select: '-desc -bgColor'}
            )
            .populate(    
                {path: 'user', select: '-pass -isAdmin'}
            )
            
        res.status(200).json({ok: true, data: scores})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const getScoresByUsername = async (req, res) => {
    try {
        let _user = await User.findOne({user: req.params.username})

        if (!_user) return res.status(404).json({ok: false, msg: 'usuario no encontrado'})

        let scores = await Score.find({user: _user._id})
            .populate(
                {path: 'tema', select: '-desc'}
            )
            .populate(    
                {path: 'user', select: '-pass -foto -isAdmin'}
            )
            
        return res.status(200).json({ok: true, data: scores})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const getScoresUserLogged = async (req, res) => {
    try {
        let scores = await Score.find({user: req.user.id})
            .populate(
                {path: 'tema', select: '-desc -__v'}
            )
            .populate(    
                {path: 'user', select: '-pass -foto -isAdmin -__v'}
            )
            
        return res.status(200).json({ok: true, data: scores})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const createScore = async (req, res) => {
    const { score, tema } = req.body

    try {
        let _tema = await Tema.findOne({_id: tema})

        if (!_tema) return res.status(404).json({ok: false, msg: 'tema no encontrado'})

        let scoreExsist = await Score.findOne({tema, user: req.user.id})

        if (scoreExsist) {
            if (Number(score) > Number(scoreExsist.score)) {
                await scoreExsist.delete()

                let newScore = new Score({
                    score: Number(score),
                    tema,
                    user: req.user.id
                })

                await newScore.save()
                return res.status(201).json({ok: true, data: newScore})
            }

            return res.status(200).json({ok: false, msg: 'el nuevo score es menor al score anterior'})
        }

        let newScore = new Score({
            score: Number(score),
            tema,
            user: req.user.id
        })

        await newScore.save()
        return res.status(201).json({ok: true, data: newScore})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const highestScores = async (req, res) => {
    try {
        let temasId = await Score.distinct('tema')
        let scores = []

        await Promise.all(temasId.map(async (x) => {
            let tema =  await Score.find({tema: x}).sort({score: -1}).limit(5)
                .populate(
                    {path: 'tema', select: '-desc -__v'}
                )
                .populate(    
                    {path: 'user', select: '-pass -isAdmin -email -__v'}
                )

            let scc = {
                tema: tema[0].tema,
                scores: tema
            }
            scores.push(scc)
        }))
        
        res.status(200).json({ok: true, data: scores})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {
    getAllScores,
    createScore,
    getScoresByUsername,
    highestScores,
    getScoresUserLogged
}