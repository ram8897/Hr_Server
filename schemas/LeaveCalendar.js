const { Module } = require('module');
const mongose = require('mongoose');
const leavePolicy = mongose.Schema({
    employeename: {
        type: String,
        required: [true, "Please Enter Employee Name"]
    },
    leavestatus: {
        type: String,
    },
    leavetype: {
        type: String,
        required: [true]
    },
    fromdate: {
        type: String,
        required: [true]
    },
    todata: {
        type: String,
        required: [true]
    },
    reason: {
        type: String,
        required: [true]
    },
    reportingmanager: {
        type: String,
    }
}, {timestamps: true});
module.exports = mongose.model("leavePolicy", leavePolicy);