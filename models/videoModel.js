const mongoose = require('mongoose');

// Define the video schema
const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: String,
    duration: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releasedate: {
        type: String,
        required: true
    },
    thumbnail: String,
    duration: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now // Automatically set the timestamp to the current date and time when a new video is created
    }
});

// Create the Video model
const Video = mongoose.model('Video', videoSchema);

module.exports = Video; // Export the Video model
