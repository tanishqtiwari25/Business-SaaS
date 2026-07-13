const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createSale } = require('../controllers/salesController');

router.post('/', protect, createSale);

module.exports = router;