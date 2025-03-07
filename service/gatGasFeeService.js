const { web3 } = require("../utility/walletUtility")

module.exports = {
    getGasFee: async (receiver, amount, sender) => {
        console.log("Hello from the gas fee service")
        console.log("receiver", receiver)
        console.log("amount", amount)

        const error = ''

        try{
            const gasLimit = await web3.eth.estimateGas({
                to: receiver,
                from: sender,
                value: web3.utils.toWei(amount, 'ether')
            })
    
            const gasPrice = await web3.eth.getGasPrice()
    
            const preGasFee = gasLimit * gasPrice
    
            const gasFee = web3.utils.fromWei(preGasFee.toString(), 'ether')
    
            // return {gasFee, gasPrice}
            console.log("gasFee")
            console.log(gasFee)
            console.log("gasPrice")
            console.log(gasPrice)

            return {gasFee, gasLimit, error, gasPrice}
        } catch (error) {
            console.log("Error from the gasFee service")
            console.log(error.message)
            return {error: error.message}
        }
    }
}