const Video = require('../models/videoModel');
const asyncHandler = require('express-async-handler');

// Controller function to create a new video
exports.createVideo = asyncHandler(async (req, res) => {
    const { title, description, file, duration, category, thumbnail } = req.body;
    const newVideo = new Video({
        title,
        description,
        file,
        duration,
        category,
        thumbnail
    });
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
});

// Controller function to get all videos
exports.getAllVideos = asyncHandler(async (req, res) => {
    const videos = await Video.find().populate('category', 'name thumbnail');
    res.status(200).json(videos);
});

// Controller function to get a single video by ID
exports.getVideoById = asyncHandler(async (req, res) => {
    const video = await Video.findById(req.params.id).populate('category', 'name thumbnail');
    if (!video) {
        return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);
});

// Controller function to update a video by ID
exports.updateVideo = asyncHandler(async (req, res) => {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVideo) {
        return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(updatedVideo);
});

// Controller function to delete a video by ID
exports.deleteVideo = asyncHandler(async (req, res) => {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) {
        return res.status(404).json({ message: 'Video not found' });
    }
    res.status(204).end();
});
