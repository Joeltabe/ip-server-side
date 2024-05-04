const mongoose = require('mongoose');

// Define the Thumbnail schema
const thumbnailSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String, // Store the URL of the Thumbnail image in Cloudinary
        required: true
    }
});

// Create the Thumbnail model
const Thumbnail = mongoose.model('Genre', thumbnailSchema);

module.exports = Thumbnail;
