const express = require('express');
const router = express.Router();
const Genre = require('../models/genreModel');
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

// Create a new genre
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

        // Create a new genre with Cloudinary URL for the thumbnail
        const genre = new Genre({
            name: req.body.name || 'Untitled Genre',
            thumbnail: result.secure_url,
        });

        // Save the genre to MongoDB
        await genre.save();

        res.status(201).json({ message: 'Genre uploaded successfully' });
    } catch (error) {
        console.error('Error creating genre:', error);
        res.status(400).json({ error: 'Error creating genre' });
    }
});
// Fetch all genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Error fetching genres' });
    }
});

// Fetch a single genre by ID
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json(genre);
    } catch (error) {
        console.error('Error fetching genre by ID:', error);
        res.status(500).json({ error: 'Error fetching genre by ID' });
    }
});

// Update a genre by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json(updatedGenre);
    } catch (error) {
        console.error('Error updating genre:', error);
        res.status(500).json({ error: 'Error updating genre' });
    }
});

// Delete a genre by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        if (!deletedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting genre:', error);
        res.status(500).json({ error: 'Error deleting genre' });
    }
});

module.exports = router;
