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
    thumbnail: [{
        type: String,
        required: true
    }],
    reviews: {
        type: Number,
        default: 0
        
    }
});

// Create the Video model
const Video = mongoose.model('Video', videoSchema);

module.exports = Video; // Export the Video model
