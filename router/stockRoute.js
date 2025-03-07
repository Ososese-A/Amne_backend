const express  = require('express')
const router = express.Router()
const {getStockInfo, getStockList, getStockNumbers} = require('../controller/stockController')
const { auth } = require('../middleware/authMiddleware')

router.get('/getStockList', auth, getStockList)

router.get('/getStockInfo', auth, getStockInfo)

router.get('/getStockNumbers', auth, getStockNumbers)

module.exports = router