const alpaca = require('../utility/alpacaAuthUtility')

const accountInfo = async (req, res) => {
    try {
        const account = await alpaca.getAccount()

        if (account.trading_bloacked) {
            res.status(400).json({
                msg: 'Account is currently restricted from trading.'
            })
        }

        console.log(`$${account.buying_power} is available as buying power.`)

        const balanceChange = account.equity - account.last_equity;
        console.log("Today's portfolio balance change:", balanceChange);

        res.status(200).json({
            balanceChange,
            trading_bloacked: account.trading_blocked,
            buying_power: account.buying_power,
            account_status: account.status,
            equity: account.equity,
            last_equity: account.last_equity,
            ...account
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {accountInfo}