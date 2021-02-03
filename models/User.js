const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, default: null},
    dateOfBirth: {type: Date, default: null},
    emailVerified: {type: String, default: null},
    passwordResetToken: {type: String, default: null},
    role: {type: String, default: null},
    status: {type: String, default: 'inactive'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = User = mongoose.model('user', UserSchema);