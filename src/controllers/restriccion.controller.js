const Restriccion = require('../models/Restriccion')
const Tema = require('../models/Tema')
const User = require('../models/User')

// @desc      Create Restriccion
// @route     POST /api/restriccion
// @access    Private
const createRest = async (req, res) => {
    const { tema } = req.body
    try {
        let _tema = await Tema.findOne({_id: tema})

        if(!_tema) return res.status(404).json({ok: false, msg: 'tema no encontrado'})

        let _user = await User.findOne({_id: req.user.id})

        if(!_user) return res.status(404).json({ok: false, msg: 'usuario no encontrado'})

        let rest = await Restriccion.findOne({$and: [ {user: _user._id}, {tema} ]})
        
        if (!rest) {
            let restriccion = new Restriccion({
                tema,
                user: _user._id,
                count: 1
            })

            await restriccion.save()

            return res.status(201).json({ok: true, data: restriccion})
        }

        let _count = rest.count + 1

        if (_count == 3) {
            let restEdited = await Restriccion.findByIdAndUpdate(rest._id, {count: _count, restriccion: true}, { new: true })
                .populate({path: 'tema', select: '-desc'})

            return res.status(201).json({ok: true, data: restEdited})
        }

        if (_count == 4) {
            return res.status(400).json({ok: false, msg: 'este usuario ya tiene una restriccion activa'})
        }

        let restEdited = await Restriccion.findByIdAndUpdate(rest._id, {count: _count}, { new: true })
            .populate({path: 'tema', select: '-desc'})

        return res.status(201).json({ok: true, data: restEdited})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc      Get Restriccion
// @route     GET /api/restriccion
// @access    Private
const getRestCurrentUser = async (req, res) => {
    try {
      let _rest = await Restriccion.find({user: req.user.id})
        .populate({path: 'tema', select: '-desc -__v'})

      return res.status(200).json({ok: true, data: _rest})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc      Get restrciccion by username
// @route     GET /api/restriccion/:username
// @access    Public
const getRestByUsername = async (req, res) => {
    try {
      let _user = await User.findOne({user: req.params.username})
      
      if (!_user) return res.status(404).json({ok: false, msg: 'usuario no encontrado'})

      let _rest = await Restriccion.find({user: _user._id})
        .populate({path: 'tema', select: '-desc -__v'})

      return res.status(200).json({ok: true, data: _rest})
      
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {
    createRest,
    getRestCurrentUser,
    getRestByUsername
}