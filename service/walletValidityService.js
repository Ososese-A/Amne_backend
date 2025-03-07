const { web3 } = require("../utility/walletUtility")

module.exports = {
    isWalletValid: async (address) => {
        // address = 0xBB583e59c9D50D1C58be39a98F0397872D9D28fD
        console.log("Thsi si the address value from the validity service")
        console.log(address)
        const isValid = await web3.eth.getBalance(address)
        if (isValid) {
            console.log(true)
            return true;
        } else {
            console.log(false)
            return false
        }
    }
}