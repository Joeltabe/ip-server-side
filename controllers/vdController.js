// const express = require('express');
// const router = express.Router();
// const Video = require('../models/videoModel');
// const asyncHandler = require('express-async-handler');

// // Handle video creation
// exports.createVideo = async (req, res) => {
//     try {
//         // Check if req.file is defined
//         if (!req.file || !req.file.buffer) {
//           return res.status(400).json({ error: 'No file provided in the request' });
//         }
    
//         // Upload video to Cloudinary
//         const result = await cloudinary.uploader.upload_stream({ resource_type: 'video' }, async (error, result) => {
//           if (error) {
//             console.error('Error uploading to Cloudinary:', error);
//             return res.status(500).json({ error: 'Error uploading to Cloudinary' });
//           }
    
//           // Save video details to MongoDB with Cloudinary URL
//           const video = new Video({
//             title: req.body.title || 'Untitled Video',
//             videoUrl: result.secure_url,
//           });
    
//           await video.save();
    
//           res.status(201).json({ message: 'Video uploaded successfully'});
//         }).end(req.file.buffer);
//       } catch (error) {
//         console.error('Error uploading video:', error);
//         res.status(500).json({ error: 'Error uploading video' });
//       }

// };

// // Controller function to get all videos
// exports.getAllVideos = asyncHandler(async (req, res) => {
//     const videos = await Video.find().populate('category', 'name thumbnail');
//     res.status(200).json(videos);
// });

// // Controller function to get a single video by ID
// exports.getVideoById = asyncHandler(async (req, res) => {
//     const video = await Video.findById(req.params.id).populate('category', 'name thumbnail');
//     if (!video) {
//         return res.status(404).json({ message: 'Video not found' });
//     }
//     res.status(200).json(video);
// });

// // Controller function to update a video by ID
// exports.updateVideo = asyncHandler(async (req, res) => {
//     const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedVideo) {
//         return res.status(404).json({ message: 'Video not found' });
//     }
//     res.status(200).json(updatedVideo);
// });

// // Controller function to delete a video by ID
// exports.deleteVideo = asyncHandler(async (req, res) => {
//     const deletedVideo = await Video.findByIdAndDelete(req.params.id);
//     if (!deletedVideo) {
//         return res.status(404).json({ message: 'Video not found' });
//     }
//     res.status(204).end();
// });
