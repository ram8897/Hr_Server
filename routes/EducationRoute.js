const express = require('express');
const { createEducation, getEducationDetails, updateEducation, getEdu } = require('../controllers/EducationController');
const router = express.Router();
router.route('/create').post(createEducation).get(getEducationDetails);
router.route("/:id/list").get(getEdu)
router.route("/:id/update").put(updateEducation)

module.exports = router;