const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

exports.createPurchase = async (req, res, next) => {
  try {
    const purchase = await Purchase.create(req.body);
    // Dynamic stock addition engine auto-trigger
    for (let item of req.body.items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.qty } });
    }
    res.status(201).json({ success: true, data: purchase });
  } catch (error) { next(error); }
};