const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    address: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    balance: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    identity: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})

module.exports = { walletSchema }
