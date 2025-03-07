const jwt = require('jsonwebtoken')
const User = require('../schemas/mongoose/userSchema')

const auth = async (req, res, next) => {
    console.log("req.file from auth middleware")
    console.log(req.file)

    //verify authentication 
    const { authorization } = req.headers 

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRETKEY)

        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log("error from auth middleware")
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = {auth}