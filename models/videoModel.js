const mongoose = require('mongoose');

// Define the video schema
const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // Other fields...
});

module.exports = videoSchema;
