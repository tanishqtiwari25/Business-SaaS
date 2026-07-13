const mongoose = require('mongoose');

const SyncLogSchema = new mongoose.Schema({
  clientLogId: { type: String, required: true, unique: true },
  action: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true },
  collectionName: { type: String, required: true },
  data: { type: Object, required: true },
  syncedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'SUCCESS' }
}, { timestamps: true });

module.exports = mongoose.model('SyncLog', SyncLogSchema);