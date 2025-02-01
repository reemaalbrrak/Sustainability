const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },  // Define unique directly
    password: { type: String, required: true }
});

// Optionally, you can add an index for email explicitly if needed
// UserSchema.index({ email: 1 }, { unique: true });  // This is often redundant if you use unique: true

module.exports = mongoose.model('User', UserSchema);