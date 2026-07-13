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

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);