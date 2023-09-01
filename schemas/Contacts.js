const mongoose = require('mongoose')

const contactsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name"]
        },
        email: {
            type: String,
            required: [true, "Please enter email"]
        },
        phone: {
            type: String,
            required: [true, "Please enter phone"]
        },
    },
    {
        timeStamps: true
    }
)

module.exports = mongoose.model('ContactModel', contactsSchema)