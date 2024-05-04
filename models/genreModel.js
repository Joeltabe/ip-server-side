const mongoose = require('mongoose');

// Define the Genre schema
const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String, // Store the URL of the thumbnail image in Cloudinary
        required: true
    }
});

// Create the Genre model
const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
