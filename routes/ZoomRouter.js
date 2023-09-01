const express = require('express')
const router = express.Router();
const { sehudeleMeeting, getMeeting } = require('../controllers/ZoomController');
router.route('/schedule')
    .post(sehudeleMeeting)
    router.route('/').get(getMeeting)

module.exports = router