const jwt = require('jsonwebtoken')

exports.requireLogin = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = await req.headers.authorization.split(' ')[1] || req.headers.authorization
            //token verify
            const decode = await jwt.verify(token, process.env.JWT_SECRET || 'secretKey')
            req.user = decode
            next()
        }
        else {
            return res.status(401).json({ok: false, msg: 'unauthorized'})
        }
    } catch (error) {
        console.log(error)
    }
}