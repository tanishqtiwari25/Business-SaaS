const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { processOfflineSync } = require('../controllers/syncController');

router.post('/offline', protect, processOfflineSync);

module.exports = router;