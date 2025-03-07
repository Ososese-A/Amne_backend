const User = require("../schemas/mongoose/userSchema")

module.exports = {
    recordTransaction: async (uId, transactionDetails) => {
        console.log("Hello from transaction record service")
        console.log(transactionDetails)
        console.log(uId)
         
        const user = await User.findById(uId)
        const transactionHistory = user.accountfinancials[0].transactionHistory
        console.log("This is the transaction History")
        console.log(transactionHistory)

        transactionHistory.push(transactionDetails)

        await user.save()
        //only save in the main controller where the service is used
        console.log("Transaction Saved ans done")
    }
}
