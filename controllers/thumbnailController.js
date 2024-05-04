const express = require('express');
const router = express.Router();
const Thumbnail = require('../models/thumbnailModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({ 
    cloud_name: 'dijypm3uf', 
    api_key: '544375846183294', 
    api_secret: 'T2g5yxNfMUTebdAk-BQJo2kNCNA' 
});

// Create a new thumbnail
router.post('/create', upload.single('thumbnail'), async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    try {
        // Check if req.file is defined
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: 'No file provided in the request' });
        }

        // Upload thumbnail image to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });

            // Create a readable stream from the file buffer
            const bufferStream = new Readable();
            bufferStream.push(req.file.buffer);
            bufferStream.push(null);

            // Pipe the file buffer stream to the upload stream
            bufferStream.pipe(stream);
        });

        // Create a new thumbnail with Cloudinary URL for the thumbnail
        const thumbnail = new Thumbnail({
            name: req.body.name || 'Untitled Thumbnail',
            thumbnail: result.secure_url,
        });

        // Save the thumbnail to MongoDB
        await thumbnail.save();

        res.status(201).json({ message: 'Thumbnail uploaded successfully' });
    } catch (error) {
        console.error('Error creating thumbnail:', error);
        res.status(400).json({ error: 'Error creating thumbnail' });
    }
});
// Fetch all thumbnail
router.get('/', async (req, res) => {
    try {
        const thumbnail = await Thumbnail.find();
        res.status(200).json(thumbnail);
    } catch (error) {
        console.error('Error fetching thumbnail:', error);
        res.status(500).json({ error: 'Error fetching thumbnail' });
    }
});

// Fetch a single thumbnail by ID
router.get('/:id', async (req, res) => {
    try {
        const thumbnail = await Thumbnail.findById(req.params.id);
        if (!thumbnail) {
            return res.status(404).json({ message: 'Thumbnail not found' });
        }
        res.status(200).json(thumbnail);
    } catch (error) {
        console.error('Error fetching thumbnail by ID:', error);
        res.status(500).json({ error: 'Error fetching thumbnail by ID' });
    }
});

// Update a thumbnail by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedThumbnail = await Thumbnail.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThumbnail) {
            return res.status(404).json({ message: 'thumbnail not found' });
        }
        res.status(200).json(updatedThumbnail);
    } catch (error) {
        console.error('Error updating thumbnail:', error);
        res.status(500).json({ error: 'Error updating thumbnail' });
    }
});

// Delete a thumbnail by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedThumbnail = await Thumbnail.findByIdAndDelete(req.params.id);
        if (!deletedThumbnail) {
            return res.status(404).json({ message: 'Thumbnail not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting thumbnail:', error);
        res.status(500).json({ error: 'Error deleting thumbnail' });
    }
});

module.exports = router;
