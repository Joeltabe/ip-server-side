    const express = require('express');
    const router = express.Router();
    const Video = require('../models/videoModel');
    const asyncHandler = require('express-async-handler');
    const cloudinary = require('cloudinary').v2;

    cloudinary.config({ 
        cloud_name: 'dijypm3uf', 
        api_key: '544375846183294', 
        api_secret: 'T2g5yxNfMUTebdAk-BQJo2kNCNA' 
    });

    exports.createVideo = async (req, res) => {
        try {
            // Check if req.file is defined
            if (!req.file || !req.file.buffer) {
                return res.status(400).json({ error: 'No file provided in the request' });
            }

            // Upload video to Cloudinary
            const result = await cloudinary.uploader.upload_stream({ resource_type: 'video' }, async (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    return res.status(500).json({ error: 'Error uploading to Cloudinary' });
                }

                // Save video details to MongoDB with Cloudinary URL
                const { title, description, duration, category, thumbnail, rating } = req.body;
                const video = new Video({
                    title: req.body.title || 'Untitled Video',
                    description: req.body.description,
                    duration: req.body.duration,
                    category: req.body.category,
                    genre: req.body.genre,
                    thumbnail: req.body.thumbnail,
                    reviews: req.body.reviews || 0,
                    videoUrl: result.secure_url,
                });

                
                await video.save();

                res.status(201).json({ message: 'Video uploaded successfully' });
            }).end(req.file.buffer);
        } catch (error) {
            console.error('Error creating video:', error);
            res.status(400).json({ error: 'Error creating video' });
        }
    };

    exports.getAllVideos = async (req, res) => {
        try {
            const videos = await Video.find().populate('category', 'name thumbnail');
            res.status(200).json(videos);
        } catch (error) {
            console.error('Error getting all videos:', error);
            res.status(500).json({ error: 'Error getting all videos' });
        }
    };

    exports.getVideoById = async (req, res) => {
        try {
            const video = await Video.findById(req.params.id).populate('category', 'name thumbnail');
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }
            res.status(200).json(video);
        } catch (error) {
            console.error('Error getting video by ID:', error);
            res.status(500).json({ error: 'Error getting video by ID' });
        }
    };

    exports.updateVideo = async (req, res) => {
        try {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedVideo) {
                return res.status(404).json({ message: 'Video not found' });
            }
            res.status(200).json(updatedVideo);
        } catch (error) {
            console.error('Error updating video:', error);
            res.status(500).json({ error: 'Error updating video' });
        }
    };

    exports.deleteVideo = async (req, res) => {
        try {
            const deletedVideo = await Video.findByIdAndDelete(req.params.id);
            if (!deletedVideo) {
                return res.status(404).json({ message: 'Video not found' });
            }
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting video:', error);
            res.status(500).json({ error: 'Error deleting video' });
        }
    };
