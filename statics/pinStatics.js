const mongoose = require("mongoose");
const bcrypt =require("bcrypt");

const assignPin = async function (data, id) {
    const pin = data.pin

    if (!pin) {
        throw Error("Invalid pin")
    }

    if (!this.findById(id)) {
        throw Error("Invalid Pin, Account not found")
    }

    console.log(`From assign pin ${mongoose.Types.ObjectId.isValid(id)}`)
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(pin, salt)

    const user = await this.findOneAndUpdate({_id: id}, {pin: hash}, {new: true})

    return user
}

const confirmPin = async function (data, id) {
    const pin = data.pin

    if (!pin) {
        throw Error("Invalid pin")
    }

    const user = await this.findById(id);

    if (!user) {
        throw Error('Invalid Pin, Account not found')
    }

    const match = await bcrypt.compare(pin, user.pin)

    if (!match) {
        throw Error('Incorrect pin')
    }

    return user
}

module.exports = { confirmPin, assignPin }