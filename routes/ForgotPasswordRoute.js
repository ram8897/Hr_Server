const express = require('express')
const { forgotpassword, recoveryPassword } = require('../controllers/ForgotpasswordController')
const router = express.Router()

router.route("/forgot-password").post(forgotpassword)
router.route("/reset-password").post(recoveryPassword)

module.exports = router