const express = require('express');
const {getLeave, createLeaveRequest } = require('../controllers/LeaveCalendarController');
const router = express.Router();

router.route("/").get(getLeave).post(createLeaveRequest);

module.exports = router;