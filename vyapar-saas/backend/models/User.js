const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Owner', 'Staff'], default: 'Staff' },
  businessDetails: {
    companyName: String,
    gstin: String,
    logoUrl: String,
    address: String
  },
  permissions: {
    addPurchase: { type: Boolean, default: false },
    editPurchase: { type: Boolean, default: false },
    deletePurchase: { type: Boolean, default: false },
    viewReports: { type: Boolean, default: false },
    manageInventory: { type: Boolean, default: false },
    posBilling: { type: Boolean, default: false }
  },
  isActive: { type: Boolean, default: true },
  refreshToken: { type: String }
}, { timestamps: true });

// ✅ Modern Async Pre-save Hook (No 'next' required!)
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return; // Agar password change nahi hua toh yahin se return ho jao
  
  this.password = await bcrypt.hash(this.password, 12); // Password hash karo aur save kar do
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);