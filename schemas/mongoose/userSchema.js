const mongoose = require("mongoose");
const { accountSchema } = require("./accountSchema");
const { financialsSchema } = require("./financialsSchema");
const userStatics = require("../../statics/userStatics");
const pinStatics = require("../../statics/pinStatics");
const accountStatics = require("../../statics/accountStatics");


const userSchema = new mongoose.Schema({
    email : {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true
    },

    password : {
        type: mongoose.Schema.Types.String,
        required: true
    },

    pin : {
        type : mongoose.Schema.Types.String,
    },

    accountCredentials : {
        type: [accountSchema]
    },

    accountfinancials: {
        type: [financialsSchema]
    }, 
}, {timestamps: true})



userSchema.statics.signup = userStatics.signup

userSchema.statics.login = userStatics.login

userSchema.statics.passwordReset = userStatics.passwordReset

userSchema.statics.assignPin = pinStatics.assignPin

userSchema.statics.confirmPin = pinStatics.confirmPin

userSchema.statics.setUpAccount = accountStatics.setUpAccount

userSchema.statics.secureAccount = accountStatics.secureAccount

userSchema.statics.confirmSecure = accountStatics.confirmSecure



module.exports = mongoose.model('User', userSchema)