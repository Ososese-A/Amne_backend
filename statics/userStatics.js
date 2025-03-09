const bcrypt =require("bcrypt");
const validator = require("validator");



const signup = async function (data) {
    const email = data.email
    const password = data.password
    

    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    const exists = await this.findOne({email});

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})
    return user
}

const login = async function (data) {
    const email = data.email
    const password = data.password

    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)) {
        throw Error(JSON.stringify({eError: 'Email is not valid'}))
    }

    const user = await this.findOne({email});

    if (!user) {
        throw Error(JSON.stringify({eError: 'Incorrect email'}))
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error(JSON.stringify({pError: 'Incorrect Password'}))
    }

    return user
}


const passwordReset = async function (data) {
    const email = data.email
    const password = data.password
    

    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    // const exists = await this.findOne({email});

    // if (exists) {
    //     throw Error('Email already in use')
    // }

    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.findOneAndUpdate({email},{password: hash})
    return user
}

module.exports = { signup, login, passwordReset}