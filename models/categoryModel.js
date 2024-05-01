const mongoose = require('mongoose');

// Define the category schema
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    }
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
