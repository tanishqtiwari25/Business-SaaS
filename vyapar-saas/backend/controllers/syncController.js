const SyncLog = require('../models/SyncLog');
const Product = require('../models/Product');

// Bulk Sync Endpoint for Offline Changes Processing
exports.processOfflineSync = async (req, res) => {
  const { operations } = req.body; // Array of operations from IndexedDB
  const syncResults = [];

  for (const op of operations) {
    try {
      // Idempotency check: Already processed?
      const existingLog = await SyncLog.findOne({ clientLogId: op.id });
      if (existingLog) {
        syncResults.push({ id: op.id, status: 'ALREADY_SYNCED' });
        continue;
      }

      if (op.collection === 'products') {
        if (op.action === 'CREATE' || op.action === 'UPDATE') {
          await Product.findOneAndUpdate(
            { sku: op.data.sku },
            { ...op.data },
            { upsert: true, new: true }
          );
        } else if (op.action === 'DELETE') {
          await Product.findOneAndDelete({ sku: op.data.sku });
        }
      }
      
      // Store Sync Log trace
      await SyncLog.create({
        clientLogId: op.id,
        action: op.action,
        collectionName: op.collection,
        data: op.data,
        syncedBy: req.user._id
      });

      syncResults.push({ id: op.id, status: 'SUCCESS' });
    } catch (err) {
      syncResults.push({ id: op.id, status: 'FAILED', error: err.message });
    }
  }

  res.status(200).json({ success: true, summary: syncResults });
};