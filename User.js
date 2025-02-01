const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },  // Define unique directly
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
