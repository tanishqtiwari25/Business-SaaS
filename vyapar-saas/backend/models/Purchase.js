const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  purchaseNumber: { type: String, required: true, unique: true },
  supplierName: { type: String, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    qty: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    gstRate: { type: Number, default: 18 }
  }],
  totalAmount: { type: Number, required: true },
  gstTotal: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['PAID', 'DUE', 'PARTIAL'], default: 'DUE' },
  billUrl: { type: String } // Cloudinary PDF/Image linkage asset
}, { timestamps: true });

module.exports = mongoose.model('Purchase', PurchaseSchema);