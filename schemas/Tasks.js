const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    issueId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    reportFrom: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Issues', tasksSchema)