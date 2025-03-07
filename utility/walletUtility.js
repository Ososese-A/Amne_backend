require('dotenv').config();
const {Web3} = require('web3')
const apiKey = process.env.API_KEY;
const rpcEndpoint = "https://rpc.ankr.com/electroneum_testnet/"
const customProvider = new Web3.providers.HttpProvider(rpcEndpoint, {
    headers: [
        {
            name: 'Authorization',
            value: `Bearer ${apiKey}`
        }
    ]
});

const web3 = new Web3(customProvider);

module.exports = { web3 }