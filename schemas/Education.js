const mongoose = require('mongoose');
const User = require('./User')
const EducationDetails = mongoose.Schema({
    schoolname: {
        type: String
    },
    schoolmarks: {
        type: Number
    },
    schoolpercentage: {
        type: Number
    },
    schooladdress: {
        type: String
    },
    collagename: {
        type: String
    },
    collagemarks: {
        type: Number
    },
    collagepercentage: {
        type: Number
    },
    collageaddress: {
        type: String
    },
    graduation: [
        {
            gcname: {
                type: String
            },
            gcmarks: {
                type: Number
            },
            gcpercentage: {
                type: Number
            },
            gcaddress: {
                type: String
            },
        }
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = mongoose.model("Education", EducationDetails);