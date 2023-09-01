const mongoose = require('mongoose');

const OtpSchema = mongoose.Schema({
    email: String,
    code: Number,
    expiresIn: Number
})

module.exports = mongoose.model("Otp", OtpSchema)