const User = require('../models/User')

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id}).select('-pass')
        return res.status(200).json({ok: true, user})
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        let _user = await User.findByIdAndUpdate(req.user.id, req.body)
        if (!_user) return res.status(400).json({ok: false, msg: 'error'})
        
        _user = await User.findOne({_id: req.user.id}).select('-pass')
        return res.status(200).json({ok: true, data: _user})
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-pass')
        return res.status(200).json({ok: true, users})
    } catch (error) {
        console.log(error)
    }
}

const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({user: req.params.username}).select('-pass')

        if (!user) return res.status(404).json({ok: false, msg: 'usuario no encontrado'})

        res.status(200).json({ok: true, data: user})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {
    getCurrentUser,
    updateUser,
    getAllUsers,
    getUserByUsername
}