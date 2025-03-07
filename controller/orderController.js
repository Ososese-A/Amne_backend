require("dotenv").config()
const User = require('../schemas/mongoose/userSchema')
const { recordOrder } = require("../service/orderRecordService")
const {updatePortfolio} = require("../service/updatePortfolioService")
const { runWithdrawal } = require("../service/withdrawalService")
const alpaca = require('../utility/alpacaAuthUtility')
const { decrypt } = require("../utility/cryptUtility")

const buyOrder = async (req, res) => {
    const {identification} = req.headers
    const identify = identification
    const id = decrypt(identify)

    const intermid = process.env.INTERMID
    
    const side = "buy"
    const {symbol, pricePerStock, noOfStock, orderPrice, orderFee, stockName} = req.body


    console.log(symbol, pricePerStock, noOfStock, orderPrice, orderFee, stockName)

    //check if everything needed is available 
    if (!symbol || !pricePerStock || !noOfStock || !orderPrice || !orderFee) {
        return res.status(500).json({error: "Insufficient order information"})
    }

    const orderDetails = {
        type: "buy",
        pricePerStock: pricePerStock,
        noOfStocks: noOfStock,
        orderFee: orderFee
    }

    const stockSymbol = symbol

    //check if you can find the user
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: "Account not found"})
    }

    //to prevent wash orders
    const existingOrders = await alpaca.getOrders({
        status: 'open',
        symbols: [symbol]
      });
  
      const oppositeSideOrders = existingOrders.filter(order => order.side === 'sell');
  
      for (const order of oppositeSideOrders) {
        await alpaca.cancelOrder(order.id);
      }
    

    try {
        await alpaca.createOrder({
            symbol,
            qty: 1,
            side,
            type: "market",
            time_in_force: "day",
          });

        const withdrawal = await runWithdrawal(id, intermid, orderPrice)
        const order = await recordOrder(id, orderDetails)
        const portfolioDetails = {stockName, stockSymbol, noOfStocks: noOfStock, pricePerStock}
        const updatedPortfolio = await updatePortfolio(id, portfolioDetails)

        if (withdrawal) {
            if (order) {
                console.log("Portfolio after order")
            }
        }
        

        res.status(200).json({msg: "Success", updatedPortfolio})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

const sellOrder = async (req, res) => {
    const {identification} = req.headers
    const identify = identification
    const id = decrypt(identify)

    const intermid = process.env.INTERMID
    
    const side = "sell"
    const {symbol, pricePerStock, orderPrice, orderFee, stockName} = req.body
    req.body.noOfStock = req.body.noOfStock * -1
    const noOfStock = req.body.noOfStock


    console.log(symbol, pricePerStock, noOfStock, orderPrice, orderFee, stockName)

    //check if everything needed is available 
    if (!symbol || !pricePerStock || !noOfStock || !orderPrice || !orderFee) {
        return res.status(500).json({error: "Insufficient order information"})
    }

    const orderDetails = {
        type: "sell",
        pricePerStock: pricePerStock,
        noOfStocks: req.body.noOfStock,
        orderFee: orderFee
    }

    const stockSymbol = symbol

    //check if you can find the user
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: "Account not found"})
    }
    

    try {
        //to prevent wash orders
        const existingOrders = await alpaca.getOrders({
            status: 'open',
            symbols: [symbol]
          });
      
          const oppositeSideOrders = existingOrders.filter(order => order.side === 'buy');
      
          for (const order of oppositeSideOrders) {
            await alpaca.cancelOrder(order.id);
          }

        await alpaca.createOrder({
            symbol,
            qty: 1,
            side,
            type: "market",
            time_in_force: "day",
          });

        const withdrawal = await runWithdrawal(id, intermid, orderPrice)
        const order = await recordOrder(id, orderDetails)
        const portfolioDetails = {stockName, stockSymbol, noOfStocks: noOfStock, pricePerStock}
        const updatedPortfolio = await updatePortfolio(id, portfolioDetails)

        if (withdrawal) {
            if (order) {
                console.log("Portfolio after sell order")
            }
        }

        res.status(200).json({msg: "Success", updatedPortfolio})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

module.exports = {buyOrder, sellOrder}