const express = require('express')
const {  signup, resetPassword } = require('../controller/signupController')
const { checkSchema } = require('express-validator')
const { userValidationSchema } = require('../schemas/validation/userSchema')
const { authCrypt, pinCrypt } = require('../middleware/authcryptMiddleware')
const { pinValidationSchema } = require('../schemas/validation/pinSchema')
const { assignPin } = require('../controller/pinController')
const { auth } = require('../middleware/authMiddleware')


const router = express.Router()

router.post("/", authCrypt, checkSchema(userValidationSchema),  signup)
router.post("/assignPin", pinCrypt, auth, checkSchema(pinValidationSchema),  assignPin)
router.post("/resetPassword", authCrypt, auth, checkSchema(userValidationSchema),  resetPassword)

module.exports = router