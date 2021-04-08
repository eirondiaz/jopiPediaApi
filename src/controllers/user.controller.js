const User = require('../models/User')

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id})
            .select('-pass')
            .populate({path: 'fans', select: '-pass -__v'})

        return res.status(200).json({ok: true, user})
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        let _user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true}).select('-pass -foto')
        if (!_user) return res.status(400).json({ok: false, msg: 'error'})
        
        //_user = await User.findOne({_id: req.user.id}).select('-pass')
        return res.status(200).json({ok: true, data: _user})
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-pass')
            .populate({path: 'fans', select: '-pass -__v'})

        return res.status(200).json({ok: true, users})
    } catch (error) {
        console.log(error)
    }
}

const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({user: req.params.username})
            .select('-pass')
            .populate({path: 'fans', select: '-pass -__v'})

        if (!user) return res.status(404).json({ok: false, msg: 'usuario no encontrado'})

        return res.status(200).json({ok: true, data: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const addFans = async (req, res) => {
    try {
        let user = await User.findOne({user: req.params.username})

        if (!user) return res.status(404).json({ok: false, msg: 'usuario no encontrado'})

        let userLogged = await User.findById(req.user.id)

        if (userLogged.user == req.params.username) return res.status(400).json({ok: false, msg: 'no puedes ser fans de ti mismo'})

        if (user.fans.find(x => x == req.user.id)) return res.status(400).json({ok: false, msg: 'ya eres fans de este usuario'})

        let fans = [...user.fans, req.user.id]

        user = await User.findOneAndUpdate({user: req.params.username}, {fans}, { new: true })
            .select('-pass')
            .populate({path: 'fans', select: '-pass -__v'})

        return res.status(200).json({ok: true, data: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

const deleteFans = async (req, res) => {
    try {
        let user = await User.findOne({user: req.params.username})

        if (!user) return res.status(404).json({ok: false, msg: 'usuario no encontrado'})

        let userLogged = await User.findById(req.user.id)

        if (userLogged.user == req.params.username) return res.status(400).json({ok: false, msg: 'no eres fans de ti mismo'})

        if (!user.fans.find(x => x == req.user.id)) return res.status(400).json({ok: false, msg: 'no eres fans de este usuario'})

        let fans = user.fans.filter(x => x != req.user.id)

        user = await User.findOneAndUpdate({user: req.params.username}, {fans}, { new: true })
            .select('-pass')
            .populate({path: 'fans', select: '-pass -__v'})

        return res.status(200).json({ok: true, data: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {
    getCurrentUser,
    updateUser,
    getAllUsers,
    getUserByUsername,
    addFans,
    deleteFans
}