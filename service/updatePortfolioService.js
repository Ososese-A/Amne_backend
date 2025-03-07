const User = require('../schemas/mongoose/userSchema')

module.exports = {
    updatePortfolio: async (id, portfolioDetails) => {
        try {
            console.log("Inside the portfolio update listener")
            const user = await User.findById(id)
            if (!user) {
                return {error: "User not found"}
            }
            const userPortfolio = user.accountfinancials[0].portfolio
            let stockExists = false

            for (let i = 0; i < userPortfolio.length; i++) {
                if (userPortfolio[i].stockSymbol === portfolioDetails.stockSymbol) {
                    userPortfolio[i].noOfStocks += portfolioDetails.noOfStocks
                    if (userPortfolio[i].noOfStocks <= 0) {
                        userPortfolio.splice(i, 1)
                    }
                    stockExists = true
                    break
                }
            }

            if (!stockExists && portfolioDetails.noOfStocks > 0) {
                userPortfolio.push(portfolioDetails)
            }
            await user.save()
            return {userPortfolio}
        } catch (error) {
            console.log('Error updating assets', error)
            return {error: error.message}
        }
    }
}
