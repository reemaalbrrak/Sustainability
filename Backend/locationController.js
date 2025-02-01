const Location = require('../models/Location');

exports.addLocation = async (req, res) => {
    const { name, description, latitude, longitude } = req.body;
    const newLocation = new Location({ name, description, latitude, longitude });
    await newLocation.save();
    res.status(201).json({ message: 'Location added!' });
};

exports.getLocations = async (req, res) => {
    const locations = await Location.find();
    res.json(locations);
};
