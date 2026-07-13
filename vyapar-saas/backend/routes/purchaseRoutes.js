const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

router.post('/', protect, async (req, res) => {
  const { purchaseNumber, supplierName, items, totalAmount, gstTotal, paymentStatus } = req.body;
  try {
    // 1. Instantiation entry layer inside Mongo Atlas
    const purchase = new Purchase({ purchaseNumber, supplierName, items, totalAmount, gstTotal, paymentStatus });
    await purchase.save();

    // 2. Automated Inventory Stock Increment Engine
    for (let item of items) {
      await Product.findOneAndUpdate(
        { name: item.name }, 
        { $inc: { stock: item.qty } }
      );
    }

    res.status(201).json({ success: true, message: 'Stock updated, purchase cataloged successfully.', data: purchase });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;