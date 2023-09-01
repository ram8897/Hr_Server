const mongoose = require('mongoose')
const {Schema} = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        otp:{
            type: String
        },
        image: {
            type: String
        },
        token: {
            type: String
        },
        role: { type: String, enum: ['Employee', 'Admin', 'Super Admin'], default: 'Employee' },
        address: [{
            type: Schema.Types.ObjectId,
            ref: 'Address'
         }], 
         education: [{
            type: Schema.Types.ObjectId,
            ref: 'Education'
         }],
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema);