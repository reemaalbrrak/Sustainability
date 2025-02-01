require('dotenv').config();  // Make sure dotenv is loaded first
console.log(process.env);  // This will show all environment variables loaded (for debugging)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);

// Serve static files from the 'frontend/assets' folder
app.use(express.static(path.join(__dirname, '../frontend/assets')));  // Corrected to point to 'assets'

// Route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/assets', 'homepage.html'));  // Corrected to point to 'assets'
});

// MongoDB connection (ensure the URI is loaded from environment variable)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected...");
    })
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));