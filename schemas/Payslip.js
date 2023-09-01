const mongoose = require('mongoose');

const payslip = new mongoose.Schema({
   employeeId:{
    type: String,
   },
   empName:{
    type: String,
   },
   designation:{
    type: String,
   },
   DOJ:{
    type: String,
   },
   payPeriod:{
    type: String,
   },
   dateOfPay:{
    type: String,
   },
   basic:{
    type: mongoose.Schema.Types.BigInt,
   },
   hra:{
    type: mongoose.Schema.Types.BigInt,
   },
   allowence:{
    type: mongoose.Schema.Types.BigInt,
   },
   medical:{
    type: mongoose.Schema.Types.BigInt,
    required: true
   },
   fixed:{
    type: mongoose.Schema.Types.BigInt,
    required: true
   },
   epf:{
    type: mongoose.Schema.Types.BigInt,
    required: true
   },
   pTax:{
    type: mongoose.Schema.Types.BigInt,
   },
   nameOfCompany: {
    type: String,
   },
   address: {
    type: String,
   }
});

const payslipdata = mongoose.model('payslip', payslip);

module.exports = payslipdata;