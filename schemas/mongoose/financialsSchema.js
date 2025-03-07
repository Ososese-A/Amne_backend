const mongoose = require("mongoose");
const { transactionSchema } = require("./transactionSchema");
const { orderSchema } = require("./orderSchema");
const { portfolioSchema } = require("./portfolioSchema");
const { walletSchema } = require("./walletSchema");

const financialsSchema = new mongoose.Schema({
    totalbuyOrders: {
        type: mongoose.Schema.Types.Number,
    },

    totalSellOrders: {
        type: mongoose.Schema.Types.Number,
    },

    totalInFlow: {
        type: mongoose.Schema.Types.Number,
    },

    totalOutFlow: {
        type: mongoose.Schema.Types.Number,
    },

    transactionHistory: {
        type: [transactionSchema]
    },

    orderHistory: {
        type: [orderSchema]
    },

    portfolio: {
        type: [portfolioSchema]
    },

    wallet: {
        type: [walletSchema]
    },

    walletBallance: {
        type: mongoose.Schema.Types.Number,
    }
}, {timestamps: true})

module.exports = { financialsSchema }