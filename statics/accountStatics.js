const bcrypt =require("bcrypt");
const { encrypt } = require("../utility/cryptUtility");



const setUpAccount = async function (data, id) {
    const firstName = data.firstName
    const lastName = data.lastName
    const mobile = data.mobile
    const address = data.address
    console.log(`This is the id from userschema: ${id}`)
    

    if (!firstName || !lastName || !mobile || !address) {
        throw Error("All fields must be filled")
    }

    const user = await this.findById(id);

    if (!user) {
        throw Error('User not found')
    }

    const account = user.accountCredentials

    // const security = encrypt(securityQuestion)
    // const salt = await bcrypt.genSalt(8);
    // const hash = await bcrypt.hash(securityAnswer, salt)

    const accountDetails = {
        firstName,
        lastName,
        mobile,
        address,
    }

    if (account.length > 0) {
        account[0] = accountDetails;
    } else {
        account.push(accountDetails)
    }

    console.log(account)

    await user.save()
    return account
}

const secureAccount = async function (data, id, aId) {
    const securityQuestion = data.securityQuestion
    const securityAnswer = data.securityAnswer

    console.log(`This is the id from userschema: ${id}`)
    

    if (!securityQuestion || !securityAnswer) {
        throw Error("All fields must be filled")
    }

    const user = await this.findById(id);

    if (!user) {
        throw Error('User not found')
    }

    const account = await user.accountCredentials.id(aId);

    //checks if account exists
    if (!account) {
        throw Error('Account has not been setup')
    }

    const security = encrypt(securityQuestion)
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(securityAnswer, salt)

    const securityDetails = {
        securityAnswer: hash,
        securityQuestion: security,
    }

    if (account.accountSecurity.length > 0) {
        account.accountSecurity[0] = securityDetails;
    } else {
        account.accountSecurity.push(securityDetails)
    }

    await user.save()
    return account
}

const confirmSecure = async function (data, id, aId) {
    const securityQuestion = data.securityQuestion
    const securityAnswer = data.securityAnswer

    console.log(`This is the id from userschema: ${id}`)
    

    if (!securityQuestion || !securityAnswer) {
        throw Error("All fields must be filled")
    }

    const user = await this.findById(id);

    if (!user) {
        throw Error('User not found')
    }

    const account = await user.accountCredentials.id(aId);

    //checks if account exists
    if (!account) {
        throw Error('Account has not been setup')
    }

    const answer = account.accountSecurity[0].securityAnswer

    const match = await bcrypt.compare(securityAnswer, answer)

    if (!match) {
        throw Error('Incorrect answer')
    }

    return account
}

module.exports = { setUpAccount, secureAccount, confirmSecure }