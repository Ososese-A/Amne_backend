const User = require('../schemas/mongoose/userSchema')
const { validationResult, matchedData } = require('express-validator')
const { createToken } = require('../utility/tokenUtility')
const { sendEmail } = require('../service/emailService')

const login = async (req, res) => {
    const errResult = validationResult(req)
    console.log(errResult)
    
    //if checkers
    if (!errResult.isEmpty()) {
        const errors = errResult.array()
        console.log(errors)
        const errorMsg = errors.map(
            error => (
                { 
                    msg: error.msg, 
                    path: error.path 
                }
            )
        );
        console.log(errorMsg)
        return res.status(400).json({errorMsg})
    }


    const data = matchedData(req)
    console.log(data)

    try {
        const user = await User.login(data)
        const tokenExpires = '3d'

        //for jwt create the token here then sent it to the user as json alsong with the user id
        const token = createToken(user._id, tokenExpires)
        // res.sendStatus(200)
        console.log({id: user._id, token, tokenExpires})
        // sendEmail("Login", "You just logged in", data.email)
        res.status(200).json({id: user._id, token, tokenExpires})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}



module.exports = {login}