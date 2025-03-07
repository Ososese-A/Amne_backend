const { web3 } = require("../utility/walletUtility")

module.exports = {
    updateWallet: async (walletaddress) => {

        if (!walletaddress) {
            return {msg: 'Invalid wallet address'}
        }

        //please don't forget we are working with this assumption
        // Assuming Electroneum atomic units work similarly to other blockchains:
        // (1 ETN = 1e8 atomic units)
        const balanceInAtomicUnits = await web3.eth.getBalance(walletaddress)

        const balanceInETN = web3.utils.fromWei(balanceInAtomicUnits, 'ether')

        return balanceInETN
    }
}