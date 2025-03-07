const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({msg: "Live and running"})
})

app.get('/getData', (req, res) => {
  const options = {
    hostname: 'paper-api.alpaca.markets', // Replace with the actual API server domain
    path: '/v2/account',
    method: 'GET',
    headers: {
      'APCA-API-KEY-ID': 'PKZZOUYRJLEWCT8F2VJJ', // Replace with your API key ID
      'APCA-API-SECRET-KEY': 'uBf1zt4fKpQZnAUp3NCidSFbhdlpfngg88fTw2XG', // Replace with your API secret key
    },
  };

  const request = https.request(options, (response) => {
    let responseData = '';

    response.on('data', (chunk) => {
      responseData += chunk;
    });

    response.on('end', () => {
      res.status(response.statusCode).send(responseData);
    });
  });

  request.on('error', (error) => {
    res.status(500).send(error.message);
  });

  request.end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
