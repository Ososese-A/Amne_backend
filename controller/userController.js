const { validationResult, matchedData } = require("express-validator")
const User = require('../schemas/mongoose/userSchema')
const { default: mongoose } = require("mongoose")
const { decrypt, encrypt } = require("../utility/cryptUtility")
const { createWallet } = require("../service/walletCreateService")
const bcrypt =require("bcrypt");

const setAccount = async (req, res) => {
    const errResult = validationResult(req)
    console.log(errResult)

    const id = req.body.id

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
        )
        console.log(errorMsg)
        return res.status(400).json({errorMsg})
    }

    const data = matchedData(req)
    console.log(data)

    try {
        const user = await User.setUpAccount(data, id)
        const account = user[0]
        console.log(`This is the id post account set up ${account._id}`)
        console.log(user)
        console.log(account)

        
        res.status(201).json({msg: `Account setup successful`, id: account._id})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const secureAccount = async (req, res) => {
    const errResult = validationResult(req)
    console.log(errResult)

    const id = req.body.id
    const aId = req.body.aId

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
        )
        console.log(errorMsg)
        return res.status(400).json({errorMsg})
    }

    const data = matchedData(req)
    console.log(data)

    try {
        const user = await User.secureAccount(data, id, aId)
        console.log(user)
        
        res.status(201).json({msg: `Account security setup successful`})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const confirmSecure = async (req, res) => {
    const errResult = validationResult(req)
    console.log(errResult)

    const id = req.body.id
    const aId = req.body.aId

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
        )
        console.log(errorMsg)
        return res.status(400).json({errorMsg})
    }

    const data = matchedData(req)
    console.log(data)

    try {
        const user = await User.confirmSecure(data, id, aId)
        console.log(user)
        
        res.status(201).json({msg: `Account security setup successful`})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const getAccount = async (req, res) => {
    const { identification } = req.headers 
    const identify = identification
    console.log(identify)
    const id = decrypt(identify)
    console.log(id);


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "User not found"})
    }

    const user = await User.findById(id)
    const account = user.accountCredentials[0]

    if (!user) {
        return res.status(404).json({error: "User not found"})
    }

    // res.status(200).json(account)
    console.log("account log from get account")
    // console.log(account)
    const accountRes = {
        msg: 'success',
        email: user.email,
        kycImage: account.kycImage.contentType,
        firstName: account.firstName,
        lastName: account.lastName,
        mobile: account.mobile,
        address: account.address,
        _id: account._id,
        accountSecurity: account.accountSecurity
    }
    console.log(accountRes)
    res.status(200).json(accountRes)
}

const kycUpload = async (req, res) => {
    const { identification } = req.headers 
    const identify = identification
    console.log(identify)
    const id = decrypt(identify)
    console.log(id);

    const { verification } = req.headers
    const verify = verification
    console.log(verify)
    const aId = decrypt(verify)
    console.log(aId)


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "User not found"})
    }


    const user =  await User.findById(id)
    if(!user) {
        return res.status(404).json({error: 'User not found'})
    }

    const account = user.accountCredentials.id(aId)
    if (!account) {
        return res.status(404).json({error: 'Account not found'})
    }

    account.kycImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype
    }

    const {address, privateKey} = createWallet()
    const salt = await bcrypt.genSalt(8)
    const identifyer = encrypt(privateKey)
    const hash = await bcrypt.hash(identifyer, salt)
    const key = `${identifyer}dif${hash}`
    const storedKey = encrypt(key)


    const wallet = user.accountfinancials
    console.log(wallet)
    console.log(typeof wallet)
    const walletDetails = {
        address: address,
        balance: 0,
        identity: storedKey
    }

    if (wallet.length > 0) {
        wallet[0].wallet = walletDetails;
    } else {
        wallet.push({wallet: walletDetails})
    }

    console.log(wallet)

    await user.save()

    res.status(201).json({msg: 'Success', address: `This is the address: ${address}`})
}

module.exports = {setAccount, secureAccount, getAccount, confirmSecure, kycUpload}