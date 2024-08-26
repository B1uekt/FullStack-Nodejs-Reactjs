require('dotenv').config()
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const whitelists = ["/", "/login", "/register"]

    if (whitelists.find(item => '/v1/api' + item === req.originalUrl)) {
        next()
    }
    else {
        if (req?.headers?.authorization?.split(' ')?.[1]) {
            const token = req.headers.authorization.split(' ')[1];

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                console.log(decoded.role)
                req.data = decoded
                next()
            } catch (error) {
                return res.status(401).json({
                    message: "the access token has expired or invalid "
                })
            }

        }
        else {
            return res.status(401).json({
                message: "You have not provided an access token or the access token has expired. "
            })
        }
    }

}

const checkRole = (req, res, next) => {
    if (req.data.role === 'USER') {
        return res.status(401).json({
            message: "NOT PERMISSTION"
        })
    }
    next()
}
module.exports = { auth, checkRole }