const asyncHandler = require('express-async-handler');
const Punch = require("../models/Clock");

const getAllPunchs = asyncHandler(async (req, res) => {
    try {
        const punchs = await Punch.find();
        res.json(punchs);
    } catch {
        res.json({ message: "Somthing Went Wrong" })
    }

})
const punchIn = asyncHandler(async (req, res) => {
    const { type } = req.body;
    if (!type) {
        return res.status(404).json({ message: "No data found" })
    }
    try {
        const punch = new Punch({ type: 'in' });
        punch.punchIn = `Punched in at ${punch.timestamp.toLocaleTimeString()}`;
        await punch.save();
        res.send(punch);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

})

const punchOut = asyncHandler(async (req, res) => {
    const { type } = req.body;
    if (!type) {
        return res.status(404).json({ message: "No data found" })
    }
    try {
        const user = req.user;
        const lastPunch = await Punch.findOne({ user }).sort({ timestamp: -1 });
        if (!lastPunch) {
            return res.status(400).json({ message: 'No punch in record found' });
        }
        if (lastPunch.type === 'out') {
            return res.status(400).json({ message: 'User already punched out' });
        }
        const punch = new Punch({ type: 'out' });
        const punches = await Punch.find({ type: 'in' });
        const lastPunchIn = punches[punches.length - 1];
        console.log("punches", punches.length);
        const hoursWorked = (punch.timestamp - lastPunchIn.timestamp) / 3600000;
        punch.punchOut = `Punched out at ${punch.timestamp.toLocaleTimeString()}`
        const hoursWithMilliseconds = new Date(hoursWorked * 3600000).toISOString().substr(11, 8);
        punch.totalWorkingHours = `Total working hours ${hoursWithMilliseconds}`
        await punch.save();
        res.send(punch);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = { punchIn, punchOut, getAllPunchs }