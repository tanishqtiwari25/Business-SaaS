// ==========================================
// 1. DOTENV CONFIGURATION (Top Priority)
// ==========================================
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(process.cwd(), '.env') });

// ==========================================
// 2. MODULE IMPORTS
// ==========================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Routes Imports
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const syncRoutes = require('./routes/syncRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

// ==========================================
// 3. APPLICATION SETUP & DATABASE
// ==========================================
const app = express();

// Database connection via Environment Variable
const dbURI = process.env.MONGO_URI;

if (dbURI) {
    connectDB(dbURI);
} else {
    console.error("❌ ERROR: MONGO_URI environment variable is missing!");
}

// ==========================================
// 4. MIDDLEWARES (CORS & Security Fixes)
// ==========================================
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet({
    crossOriginResourcePolicy: false,
}));

app.use(express.json());

// ==========================================
// 5. API ROUTES
// ==========================================
app.get('/', (req, res) => {
    res.send('API is running successfully...');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/purchases', purchaseRoutes);

// ==========================================
// 6. SERVER START
// ==========================================
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Production Architecture listening on port ${PORT}`);
});