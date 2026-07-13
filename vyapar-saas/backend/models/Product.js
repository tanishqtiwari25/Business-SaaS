const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  sku: { type: String, required: true, unique: true, index: true },
  barcode: { type: String, unique: true, index: true },
  qrCodeData: { type: String },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  minStockAlert: { type: Number, default: 5 },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  gstRate: { type: Number, default: 18 }, // Percentage
  expiryDate: { type: Date },
  warehouse: { type: String, default: 'Main Warehouse' }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);