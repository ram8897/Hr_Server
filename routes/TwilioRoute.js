const express = require('express')
const router = express.Router();
const { sendOtp } = require('../controllers/TwilioController');
router.route('/')
    .post(sendOtp)

module.exports = router