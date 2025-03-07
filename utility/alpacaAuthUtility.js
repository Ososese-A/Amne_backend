const Alpaca = require('@alpacahq/alpaca-trade-api')

const alpaca = new Alpaca({
    keyId: process.env.KEYID,
    secretKey: process.env.SECRETKEY,
    paper: true,
    usePolygon: false,
})

module.exports = alpaca