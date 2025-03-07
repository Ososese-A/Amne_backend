const express = require('express')
const { setAccount, secureAccount, getAccount, confirmSecure, kycUpload } = require('../controller/userController')
const { userCrypt } = require('../middleware/authcryptMiddleware')
const { checkSchema } = require('express-validator')
const { userInfoValidationSchema } = require('../schemas/validation/userInfoSchema')
const { auth } = require('../middleware/authMiddleware')
const { userSecureValidationSchema } = require('../schemas/validation/userSecSchema')
const { upload } = require('../middleware/fileUploadMiddleware')
const router = express.Router()

router.post("/", userCrypt, auth, checkSchema(userInfoValidationSchema), setAccount)

router.post("/secure", userCrypt, auth, checkSchema(userSecureValidationSchema), secureAccount)

router.post("/confirmSecure", userCrypt, auth, checkSchema(userSecureValidationSchema), confirmSecure)

router.post("/uploadImage", auth, upload.single('kycImage'), kycUpload)

router.get('/', auth, getAccount)

router.patch('/', userCrypt, auth, checkSchema(userInfoValidationSchema), setAccount)

module.exports = router
