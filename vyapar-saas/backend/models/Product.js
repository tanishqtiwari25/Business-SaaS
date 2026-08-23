const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  sku: { type: String, required: true, unique: true, index: true },
  barcode: { type: String, sparse: true, index: true },
  qrCodeData: { type: String },
  category: { type: String, default: 'General' },
  stock: { type: Number, required: true, default: 0 },
  minStockAlert: { type: Number, default: 5 },
  purchasePrice: { type: Number, default: 0 },
  sellingPrice: { type: Number, default: 0 },
  gstRate: { type: Number, default: 0 },
  warehouse: { type: String, default: 'Main Warehouse' }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);