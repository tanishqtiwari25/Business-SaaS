const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Product = require('../models/Product');

// Get All Products Route
router.get('/', protect, async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add Product Route
router.post('/', protect, authorize('manageInventory'), async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;