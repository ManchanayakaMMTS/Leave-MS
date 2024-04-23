const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    reason: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    comments: {
        type: String
    }
});

const Leave = mongoose.model("Leave", leaveSchema);


module.exports = Leave;
