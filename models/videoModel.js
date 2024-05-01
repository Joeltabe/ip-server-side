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
    file: {
        type: String,
        required: true
    },
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

module.exports = Video;
