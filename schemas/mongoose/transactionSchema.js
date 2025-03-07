const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    participant: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    type: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    fee: {
        type: mongoose.Schema.Types.Number,
        required: true
    },

    amount: {
        type: mongoose.Schema.Types.Number,
        required: true
    }, 

    dateTime: {
        type: mongoose.Schema.Types.Number,
        required: true
    }
}, {timestamps: true})

module.exports = { transactionSchema }