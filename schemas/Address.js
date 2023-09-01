const mongoose = require('mongoose')
const User = require('./User')
const addressModel = mongoose.Schema({
    Address : {
        type: String,
        required: true
    },
    Street : {
        type: String,
        required: true
    },
    City : {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

}, { timestamps: true})


module.exports = mongoose.model("Address", addressModel)
