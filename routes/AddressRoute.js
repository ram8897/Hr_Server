const express = require('express')
const { getAddress, createAddress } = require('../controllers/AddressesController')
const router = express.Router()
router.route("").get(getAddress).post(createAddress);

module.exports = router;