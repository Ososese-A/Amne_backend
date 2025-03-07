const { createWallet } = require("../service/walletCreateService")
const { updateWallet } = require("../service/walletUpdateService")
const User = require('../schemas/mongoose/userSchema')
const { decrypt } = require("../utility/cryptUtility")
const { getData } = require("../service/getDataService")
const { isWalletValid } = require("../service/walletValidityService")
const { runWithdrawal } = require("../service/withdrawalService")
const { getGasFee } = require("../service/gatGasFeeService")


const walletInfo = async (req, res) => {
    const { identification } = req.headers 
    const identify = identification
    console.log(identify)
    const id = decrypt(identify)
    console.log(id);

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: "User not found"})
    }

    const walletinfo = user.accountfinancials[0].wallet[0]

    res.status(200).json(walletinfo)
}

const financialsInfo = async (req, res) => {
    const { identification } = req.headers 
    const identify = identification
    console.log(identify)
    const id = decrypt(identify)
    console.log(id);

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: "User not found"})
    }

    const account = user.accountCredentials
    if (!(account.length >= 1)) {
        console.log({error: "Account not setup"})
        console.log(account.length)
        console.log(typeof account)
        return res.status(404).json({error: "Account not setup"})
    }

    const walletAddress = user.accountfinancials[0].wallet[0].address
    const wallet = user.accountfinancials[0].wallet[0]

    console.log("This is the wallet address check from fianacials before we can use the service")
    console.log(walletAddress)

    const newBalance = await updateWallet(walletAddress)
    console.log(newBalance)

    wallet.balance = newBalance

    await user.save()

    const financialsinfo = user.accountfinancials[0]
    const Nurl = 'https://usd.currencyrate.today/ngn'
    const Ntag = 'td[headers="ng-nairablackmarket header-buy"]'

    const Eurl = 'https://coincodex.com/convert/electroneum/usd/'
    const Etag = 'td[_ngcontent-coincodex-c3015836903]'

    let data = await getData(Nurl, Ntag)
    let dataRes = data[0].text
    dataRes = dataRes.replace("₦", "")
    dataRes = dataRes.replace(/,/g, "")
    const rate = parseFloat(dataRes);
    console.log(rate)

    let etnData = await getData(Eurl, Etag)
    let etn = etnData[0].text
    etn = etn.replace(" USD", "")
    const etnValue = parseFloat(etn)
    console.log(etnValue)
    

    res.status(200).json({financialsinfo, rate, etnValue})
}

const registerWallet = async (req, res) => {
    const { identification } = req.headers 
    const identify = identification
    console.log(identify)
    const id = decrypt(identify)
    console.log(id);


    try {
        const user =  await User.findById(id)

        const {address, privateKey} = createWallet()
        const salt = await bcrypt.genSalt(8)
        const identifyer = encrypt(privateKey)
        const hash = await bcrypt.hash(identifyer, salt)
        const key = `${identifyer}dif${hash}`
        const storedKey = encrypt(key)

        const wallet = user.accountfinancials[0].wallet
        const walletDetails = {
            address: address,
            balance: 0,
            identity: storedKey
        }

        if (wallet.length > 0) {
            wallet[0] = walletDetails;
        } else {
            wallet.push(walletDetails)
        }

        console.log(wallet)

        await user.save()

        res.status(201).json({address})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const listWallets = (req, res) => {
    try {
        res.status(200).json({walletStore})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteWallet = () => {
    try {
    } catch (error) {
    }
}

const registerWalletUpdate = (req, res) => {
    //get the id and adress from req 

    //pass the address into the service
    updateWallet()
}

const withdraw = async (req, res) => {
    console.log("withdrawal is actuallt running")
    const { identification } = req.headers 
    const identify = identification
    console.log(identify)
    const id = decrypt(identify)
    console.log(id);


    const { amount, address } = req.body
    
    const withdrawalInfo = runWithdrawal(id, address, amount)

    if (withdrawalInfo.error) {
        return res.status(500).json({error: (await withdrawalInfo).error})
    }

    console.log("Withdrawal successful")
    res.status(200).json({msg: "Withdrawal successful", withdrawalInfo})
}

const checkWallet = (req, res) => {
    const { address } = req.body

    const validity = isWalletValid(address)

    if(validity) {
        return res.status(200).json({msg: 'Wallet is Valid'})
    } else {
        return res.status(500).json({error: 'Wallet is invalid'})
    }
}

const checkGasFee = async (req, res) => {
    console.log("Check gas fee is actuallt running")
    const { address, amount, sender } = req.body

    //perform the if checks

    const {gasFee, error} = await getGasFee(address, amount, sender)
    console.log("This message is from gasFee controller")
    console.log(gasFee)
    console.log(error)
    console.log(typeof amount)
    console.log(typeof gasFee)


    if (error != '') {
        console.log(error)
        // res.status(500).json({error: error.message})
        return res.status(500).json({error: `Insufficient funds, please fund your wallet`})
    }
    
    res.status(200).json({gasFee})
}

module.exports = { 
    registerWallet, 
    listWallets, 
    deleteWallet, 
    withdraw, 
    walletInfo, 
    financialsInfo,
    checkWallet,
    checkGasFee
}