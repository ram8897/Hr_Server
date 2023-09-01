const express = require('express')
const { changePassword } = require('../controllers/ChangePasswordController')
const router = express.Router()
router.route("/").put(changePassword);

module.exports = router;