const express = require('express');
const router = express.Router();
const Genre = require('../models/genreModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dijypm3uf', 
    api_key: '544375846183294', 
    api_secret: 'T2g5yxNfMUTebdAk-BQJo2kNCNA' 
});

// Create a new genre
router.post('/', async (req, res) => {
    try {
        // Upload thumbnail image to Cloudinary
        const result = await cloudinary.uploader.upload(req.body.thumbnail, { resource_type: 'image' });

        // Create a new genre with Cloudinary URL for the thumbnail
        const genre = new Genre({
            name: req.body.name,
            thumbnail: result.secure_url
        });

        // Save the genre to MongoDB
        await genre.save();

        res.status(201).json({ message: 'Genre created successfully' });
    } catch (error) {
        console.error('Error creating genre:', error);
        res.status(400).json({ error: 'Error creating genre' });
    }
});

module.exports = router;
