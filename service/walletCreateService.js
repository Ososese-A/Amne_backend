const { web3 } = require("../utility/walletUtility")

module.exports = {
    createWallet: () => {
        //wallet creation logic here
        const web3wallet = web3.eth.accounts.create()
        const address = web3wallet.address
        const privateKey = web3wallet.privateKey

        // walletStore.push({address, privateKey})
        // console.log("Shared action performed with data:", uId)
        return {address, privateKey}
    }
}