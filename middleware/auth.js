const jwt = require('jsonwebtoken')
const User = require('../Model/Schema')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const verifiedToken = jwt.verify(token, 'secret')

        if (!verifiedToken) {
            throw new Error()
        }

        req.verifiedToken = verifiedToken
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth