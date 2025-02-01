const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // Only declare this once

exports.register = async (req, res) => {
    const { name, email, password, dob, id } = req.body;

    // Validate that all required fields are provided
    if (!name || !email || !password || !dob || !id) {
        return res.status(400).json({ message: 'Username, email, password, dob, and id are required!' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email!' });
    }

    // Proceed with user creation
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: name, email, password: hashedPassword, dob, id });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered!' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ email });

        // Log user information to debug
        console.log('User found:', user);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password (without bcrypt for debugging purposes)
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Log JWT Secret to check if it's loaded correctly
        console.log('JWT Secret:', process.env.JWT_SECRET);

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the response with token and username
        res.json({ token, username: user.username });
    } catch (error) {
        // Catch any unexpected errors
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error with login process' });
    }
};

