// const { color } = require('d3');
const mongoose = require('mongoose')
const holidays = mongoose.Schema({
        title: String,
        primary: String,
        secondary: String,
        startTime: String,
        endTime: String,
        startDate: String,
        endDate: String
})

module.exports = mongoose.model("holidays", holidays);