const User = require("../schemas/mongoose/userSchema")
const { recordTransaction } = require("../service/transactionRecordService")
const { convertBigIntToString } = require("../helper/bigIntConversionHelper")
const { web3 } = require("../utility/walletUtility")
const { getGasFee } = require("../service/gatGasFeeService")
const { decrypt } = require("../utility/cryptUtility")
const { updateWallet } = require("../service/walletUpdateService")

module.exports = {
    runWithdrawal: async (id, receiver, amount) => {
    const user = await User.findById(id)
    const wallet = user.accountfinancials[0].wallet[0]

    //get the sender
    const sender = wallet.address
    console.log("This is the sender for the transaction")
    console.log(sender)

    //get the amount
    const amountFromUser = web3.utils.toWei(amount.toString(), 'ether');

    //get the user identity
    let signer = wallet.identity
    signer = decrypt(signer)
    signatures = signer.split("=dif")
    signer = decrypt(signatures[0])
    console.log("This is the wallet identity", signer)

    
    //check if they are all present
    if (!sender || !receiver || !amountFromUser || !signer) {
        return {error: "Transaction failed"}
    }


    //get gasFee
    const {gasLimit, error, gasPrice, gasFee} = await getGasFee(receiver, amount, sender)

    if (error != '') {
        console.log(error)
        return {error: `Insufficient funds, please fund your wallet`}
    }

    const transaction = {
        from: sender,
        to: receiver,
        value: amountFromUser,
        gas: gasLimit,
        gasPrice: gasPrice       
    }

    console.log("Step at transaction")
    console.log(transaction)


    //complete transaction
    try {
        console.log("This is the withdrawal try")
        const signedTransaction = await web3.eth.accounts.signTransaction(transaction, signer)
        const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)

        //get the wallet balance
        const balance = await updateWallet(sender)
        console.log("This is the balance for the transaction")
        console.log(convertBigIntToString(balance))

        wallet.balance = balance

        await user.save()

        console.log("receipt balance from withdrawal")
        console.log(convertBigIntToString(receipt))
        const result = convertBigIntToString(receipt)
        console.log("It works")
        const transactionDetails = {
            participant: receiver,
            type: "Withdrawal",
            fee: gasFee,
            amount: amount,
            dateTime: Date.now(),
        }
        await recordTransaction(id,transactionDetails)
        return {msg: "Transaction successful", result}
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return {error: "Transaction failed"}
    }
 }
}
