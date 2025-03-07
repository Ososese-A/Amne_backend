const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    type: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    pricePerStock: {
        type: mongoose.Schema.Types.Number,
        required: true
    },

    noOfStocks: {
        type: mongoose.Schema.Types.Number,
        required: true
    },

    orderFee: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
    
}, {timestamps: true})

module.exports = { orderSchema }