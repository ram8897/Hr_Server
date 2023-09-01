const express = require('express')
const router = express.Router();
const { userLogin } = require("../controllers/SigninController")
router.route('/')
    .post(userLogin);
module.exports = router
