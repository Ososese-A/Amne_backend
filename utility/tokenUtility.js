const jwt = require('jsonwebtoken')

const createToken = (_id, expires) => {
    console.log(`This is the id within the token creation ${_id}`)
    return jwt.sign({_id}, process.env.SECRETKEY, {expiresIn: expires})
}

module.exports = {createToken}