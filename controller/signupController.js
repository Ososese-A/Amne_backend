const User = require('../schemas/mongoose/userSchema')
const { validationResult, matchedData } = require('express-validator')
const { createToken } = require('../utility/tokenUtility')
// const { sendEmail } = require('../service/emailService')

const signup = async (req, res) => {
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
        const user = await User.signup(data)
        const tokenExpires = '3d'

        console.log(`This is the id post token creation ${user._id}`)

        const token = createToken(user._id, tokenExpires)
        // res.sendStatus(200)

        // sendEmail("Successful Signup", "thank you for signing up to our app", data.email)
        res.status(201).json({id: user._id, token, tokenExpires})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

const resetPassword = async (req, res) => {
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
        const user = await User.passwordReset(data)
        const tokenExpires = '3d'

        console.log(`This is the id post token creation ${user._id}`)

        const token = createToken(user._id, tokenExpires)
        // res.sendStatus(200)

        // sendEmail("Successful Signup", "thank you for signing up to our app", data.email)
        res.status(201).json({id: user._id, token, tokenExpires})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}


module.exports = {signup, resetPassword}