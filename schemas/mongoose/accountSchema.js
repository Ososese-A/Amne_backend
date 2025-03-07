const mongoose = require("mongoose");

const accountSecSchema = new mongoose.Schema({
    securityQuestion: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    securityAnswer: {
        type: mongoose.Schema.Types.String,
        required: true
    },
}, {timestamps: true})


const accountSchema = new mongoose.Schema({
    firstName: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    lastName: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    mobile: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    address: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    accountSecurity: {
        type: [accountSecSchema]
    },

    kycImage: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})


module.exports = { accountSchema, accountSecSchema };