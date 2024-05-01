const express = require('express');
const router = express.Router();
const Video = require('../models/video');

// Handle review submission
router.post('/api/videos/reviews', async (req, res) => {
    try {
        const { videoId, rating } = req.body;
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).send({ error: 'Video not found' });
        }
        video.reviews += 1;
        await video.save();
        res.status(201).send(video);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
