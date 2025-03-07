const mongoose = require("mongoose");


const portfolioSchema = new mongoose.Schema({
    stockName: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }, 

    stockSymbol: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },

    noOfStocks: {
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: true
    },

    pricePerStock: {
        type: mongoose.Schema.Types.Number,
        required: true,
    }
}, {timestamps: true})

module.exports = { portfolioSchema }