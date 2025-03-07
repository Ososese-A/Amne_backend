const express = require('express')
const { registerWallet, deleteWallet, withdraw, walletInfo, financialsInfo, checkWallet, listWallets, checkGasFee } = require('../controller/walletController')
const { auth } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', auth, walletInfo)

router.get('/financials', auth, financialsInfo)

router.get('/createWallet', auth, registerWallet)

router.get('/allWallets', auth, listWallets)

router.delete('/deleteWallet', auth, deleteWallet)

router.post('/withdraw', auth, withdraw)

router.post('/checkWallet', auth, checkWallet)

router.post('/checkGasFee', auth, checkGasFee)

module.exports = router