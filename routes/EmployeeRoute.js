const express = require('express')
const { getEmployees, createEmployee, getEmployeeById, updateEmployee } = require('../controllers/EmployeeController');
const router = express.Router()

router.route('').get(getEmployees).post(createEmployee)

router.route('/:id').get(getEmployeeById).put(updateEmployee)

module.exports = router;