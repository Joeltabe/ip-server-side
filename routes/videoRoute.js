const express = require('express');
const router = express.Router();
const videoController = require('../controllers/vdController');
const multer = require('multer');

// Configure Multer for video upload
const storage = multer.memoryStorage();
const upload = multer({ dest: ''});

// Route to create a new video
router.post('/upload', upload.single('video'), videoController.createVideo);
    

// Route to get all videos
router.get('/videos', videoController.getAllVideos);


// Route to get a single video by ID
router.get('/videos/:id', videoController.getVideoById);

// Route to update a video by ID
router.put('/videos/:id', videoController.updateVideo);

// Route to delete a video by ID
router.delete('/videos/:id', videoController.deleteVideo);

module.exports = router;
