const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customerName: { type: String, default: 'Cash Customer' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    qty: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  subTotal: { type: Number, required: true },
  gstAmount: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['PAID', 'UNPAID'], default: 'PAID' }
}, { timestamps: true });

module.exports = mongoose.model('Sales', SalesSchema);