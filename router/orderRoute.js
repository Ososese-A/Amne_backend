const express = require('express')
const router = express.Router()
const {buyOrder, sellOrder} = require('../controller/orderController')
const { auth } = require('../middleware/authMiddleware')

router.post('/buyOrder', auth, buyOrder)

router.post('/sellOrder', auth, sellOrder)

module.exports = router;