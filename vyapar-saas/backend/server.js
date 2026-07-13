const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const syncRoutes = require('./routes/syncRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Main App API Mountpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/purchases', purchaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Production Architecture listening on port ${PORT}`));