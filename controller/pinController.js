const User = require('../schemas/mongoose/userSchema')
const { validationResult, matchedData } = require('express-validator')

const assignPin = async (req, res) => {
    const errResult = validationResult(req)
    console.log(errResult)

    const id = req.body.id

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
        const user = await User.assignPin(data, id)

        // const token = createToken(user._id)
        res.status(201).json({id})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}


const confirmPin = async (req, res) => {
    const errResult = validationResult(req)
    console.log(errResult)

    const id = req.body.id

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
        const user = await User.confirmPin(data, id)

        // const token = createToken(user._id)
        res.status(200).json({id})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}


module.exports = {assignPin, confirmPin}