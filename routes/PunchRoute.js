const express = require('express');
const router = express.Router();
const { punchIn, punchOut, getAllPunchs } = require('../controllers/PunchController');
router.route('/punch-in').post(punchIn);
router.route('/punch-out').post(punchOut);
router.route("/punch/all").get(getAllPunchs)
module.exports = router;