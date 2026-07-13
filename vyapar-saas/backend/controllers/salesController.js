const Sales = require('../models/Sales');
const Product = require('../models/Product');

exports.createSale = async (req, res, next) => {
  try {
    const sale = await Sales.create(req.body);
    // POS terminal optimization stock subtraction flow
    for (let item of req.body.items) {
      await Product.findOneAndUpdate({ sku: item.sku }, { $inc: { stock: -item.qty } });
    }
    res.status(201).json({ success: true, data: sale });
  } catch (error) { next(error); }
};