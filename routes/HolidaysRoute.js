const express = require('express');
const { getAllHolidays, createHolidays, getHolidaysById, updateHoliday, deleteHoliday } = require('../controllers/HolidaysController');
const router = express.Router();

router.route("").get(getAllHolidays).post(createHolidays);
router.route("/:id").get(getHolidaysById).put(updateHoliday).delete(deleteHoliday);

module.exports = router;