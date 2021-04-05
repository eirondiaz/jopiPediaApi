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

module.exports = {
    getCurrentUser,
    updateUser,
    getAllUsers
}