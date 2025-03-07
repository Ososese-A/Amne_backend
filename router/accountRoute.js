const express = require('express');
const { accountInfo } = require('../controller/accountController');
const router = express.Router()

router.get('/accountInfo', accountInfo);

module.exports = router