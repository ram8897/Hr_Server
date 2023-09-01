const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema(
    {
       firstName: {
        type: String,
       },
       lastName: {
        type: String,
       },
       empId: {
        type: String,
       },
       dept: {
        type: String,
       },
       designation: {
        type: String,
       },
       empRole: {
        type: String
       },
       location: {
        type: String
       },
       salary: {
        type: String
       },
       avatar: {
        type: String
       },
       email: {
        type: String,
       },
       phone: {
        type: String,
       },
       dateOfJoining: {
        type: String
       },
       dateOfBirth: {
        type: String
       }
    },
    {
        timeStamps: true
    }
)

const employee = mongoose.model('employees', employeeSchema);
module.exports = employee;