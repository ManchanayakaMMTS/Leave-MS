const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    employeeNumber: {
        type: Number,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Example roles, customize as needed
        default: 'user'
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
