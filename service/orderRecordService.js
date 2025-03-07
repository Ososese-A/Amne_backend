const User = require("../schemas/mongoose/userSchema")

module.exports = {
    recordOrder: async (uId, orderDetails) => {
        console.log("Hello from order record service")
        console.log(orderDetails)
        console.log(uId)
         
        const user = await User.findById(uId)
        const orderHistory = user.accountfinancials[0].orderHistory
        console.log("This is the order History")
        console.log(orderHistory)

        orderHistory.push(orderDetails)

        await user.save()
        //only do this isn the main controller where the service is used
        console.log("order Saved and done")
    }
}
