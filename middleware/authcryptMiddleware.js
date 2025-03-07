const { isPotentiallyEncrypted, decrypt } = require("../utility/cryptUtility")

const authCrypt = (req, res, next) => {
    //check if it is encrypted
    if (isPotentiallyEncrypted(req.body.email)) {
        //if it is decrypt and pass it along
        req.body.password = decrypt(req.body.password)
        req.body.email = decrypt(req.body.email)
    } else {
        //if not throw an error
        throw Error("Unreconized or invalid encryption")
    }

    next()
}

const pinCrypt = (req, res, next) => {
    if(isPotentiallyEncrypted(req.body.pin)) {
        req.body.pin = decrypt(req.body.pin)
    } else {
        throw Error("Unreconized or invalid encryption")
    }
    next()
}

const userCrypt = (req, res, next) => {
    if (req.body.aId) {
        // console.log(req.body.aId)
        // console.log(req.body.id)
        // console.log(req.body.securityAnswer)
        // console.log(req.body.securityQuestion)
        // console.log(req.body.aId)

        if(isPotentiallyEncrypted(req.body.aId)) {
            console.log(req.body.aId)
            req.body.id = decrypt(req.body.id)
            req.body.aId = decrypt(req.body.aId)
            req.body.securityQuestion = decrypt(req.body.securityQuestion)
            req.body.securityAnswer = decrypt(req.body.securityAnswer)
            console.log(req.body.aId)
            console.log(req.body.id)
            console.log(req.body.securityAnswer)
            console.log(req.body.securityQuestion)
            console.log(`This is the user id fron usercrypt ${req.body.id}`)
            console.log(`This is the user aIid fron usercrypt ${req.body.aId}`)
        } else {
            throw Error("Unreconized or invalid encryption")
        }

    } else {
        if(isPotentiallyEncrypted(req.body.firstName)) {
            req.body.firstName = decrypt(req.body.firstName)
            req.body.lastName = decrypt(req.body.lastName)
            req.body.mobile = decrypt(req.body.mobile)
            req.body.address = decrypt(req.body.address)
            req.body.id = decrypt(req.body.id)
            if (req.body.aId) {
                req.body.aId = decrypt(req.body.aId)
            }
            console.log(`This is the user id fron usercrypt ${req.body.id}`)
        } else {
            throw Error("Unreconized or invalid encryption")
        }
    }
    next()
}

module.exports = {authCrypt, pinCrypt, userCrypt}