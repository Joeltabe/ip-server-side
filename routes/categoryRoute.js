const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');

// Controller function to create a new category
router.post('/', asyncHandler(async (req, res) => {
    const { name, thumbnail } = req.body;
    const newCategory = new Category({
        name,
        thumbnail
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
}));

// Controller function to get all categories
router.get('/', asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
}));

// Controller function to get a single category by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
}));

// Controller function to update a category by ID
router.put('/:id', asyncHandler(async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
}));

// Controller function to delete a category by ID
router.delete('/:id', asyncHandler(async (req, res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.status(204).end();
}));

module.exports = router;
