const jwt = require('jsonwebtoken')

exports.requireAdmin = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = await req.headers.authorization.split(' ')[1] || req.headers.authorization
            //token verify
            const decode = await jwt.verify(token, process.env.JWT_SECRET || 'secretKey')
            if (!decode.isAdmin) return res.status(404).json({ok: false, msg: 'no es admin'})

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