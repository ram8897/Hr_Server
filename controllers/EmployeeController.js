const asyncHandler = require('express-async-handler')
const Employee = require('../schemas/Employee')

const getEmployees = asyncHandler(async (req, res) => {
   try{
    const employess = await Employee.find();
    res.status(200).json(employess)
   } catch(error) {
    res.status(500).json("Internal server error")
   }
})

const getEmployeeById = asyncHandler(async (req,res) => {
  try{
    const employeeById = await Employee.findById(req.params.id);
    res.status(200).json(employeeById);
  } catch(error) {
    res.status(500).json("Internal server error")
  }
})

const createEmployee = asyncHandler(async (req, res) => {
    const { firstName, lastName, empId, dept, empRole, designation, location, salary} = req.body;
    if( !firstName, !lastName, !empId, !dept, !empRole, !designation, !location, !salary) {
        res.status(400).json("All feilds are mandatory")
    }
    try {
        const employess = await Employee.create(req.body);
        res.status(200).json(employess);
    } catch(error) {
        res.status(500).json("Internal server error")
    }
})

const updateEmployee = asyncHandler(async (req, res) => {
    try{
        const employees = await Employee.findByIdAndUpdate(req.params.id, req.body);
        // getEmployees(req, res);
        res.status(200).json(employees)
    } catch(error) {
        res.status(200).json("Internal server error")
    }
})

module.exports = { createEmployee, getEmployees, getEmployeeById,updateEmployee }