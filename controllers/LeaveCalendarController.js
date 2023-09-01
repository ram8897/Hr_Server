const asyncHandler = require('express-async-handler')
// const leavePolicy = require("../models/Leave")
const getLeave = asyncHandler(async (req, res) => {
    try{
        const leave = await leavePolicy.find({});
        console.log('fetched all Leaves')
        res.status(200).json(leave)
    }catch(err){
        console.log('failed to fetch Leaves')
        res.status(500)
        throw new Error(err.message) 
    }
})

const createLeaveRequest = asyncHandler((req, res) => {
    let {employeename, leavestatus, leavetype, fromdate, todata, reason, reportingmanager } = req.body;
    console.log("reBody--------", req.body)
    if (!employeename || !leavetype || !fromdate || !todata || !reason) {
        res.status(400)
        throw new Error('All fields are mandatory!')
    }
    // try {
    //     (async () => {
    //         const createLeave = await leavePolicy.create(req.body)
    //         res.status(201).json(createLeave)
    //     })()
    // } catch (err) {
    //     res.status(500)
    //     throw new Error(err.message)
    // }
})

module.exports = {getLeave, createLeaveRequest}
