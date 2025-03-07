const express = require('express');
const Alpaca = require('@alpacahq/alpaca-trade-api');

const app = express();
const port = 3000;

const alpaca = new Alpaca({
  keyId: 'PKZZOUYRJLEWCT8F2VJJ', // Replace with your API key ID
  secretKey: 'uBf1zt4fKpQZnAUp3NCidSFbhdlpfngg88fTw2XG', // Replace with your API secret key
  paper: true, // Set to false if you want to use a live account
  usePolygon: false, // Set to true if you want to use Polygon for market data
});

app.get('/account', async (req, res) => {
  try {
    const account = await alpaca.getAccount();

    if (account.trading_blocked) {
      console.log('Account is currently restricted from trading.');
    }

    console.log(`$${account.buying_power} is available as buying power.`);

    res.status(200).json({
      trading_blocked: account.trading_blocked,
      buying_power: account.buying_power,
      account_status: account.status,
      equity: account.equity,
      last_equity: account.last_equity,
      ...account // Include all other account details
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
