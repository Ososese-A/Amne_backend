const express = require('express')
const { login } = require('../controller/loginController')
const { checkSchema } = require('express-validator')
const { userValidationSchema } = require('../schemas/validation/userSchema')
const { pinValidationSchema } = require('../schemas/validation/pinSchema')
const { authCrypt, pinCrypt } = require('../middleware/authcryptMiddleware')
const { auth } = require('../middleware/authMiddleware')
const { confirmPin } = require('../controller/pinController')


const router = express.Router()

router.post("/", authCrypt, checkSchema(userValidationSchema),  login)
router.post("/confirmPin", pinCrypt, auth, checkSchema(pinValidationSchema),  confirmPin)

module.exports = router