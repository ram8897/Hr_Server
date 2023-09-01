const express = require('express');
const { getAllMenuList } = require('../controllers/SidemenuController');
const router = express.Router();

router.route("/menu").get(getAllMenuList);

module.exports = router;