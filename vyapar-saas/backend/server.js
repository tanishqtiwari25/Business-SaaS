// ==========================================
// 1. DOTENV CONFIGURATION
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

const MONGO_URI_DIRECT = "mongodb+srv://realtanishqtiwari:Ramandatabasehh@cluster0.lntmazo.mongodb.net/?appName=Cluster0";
const dbURI = process.env.MONGO_URI || MONGO_URI_DIRECT;

if (dbURI) {
    connectDB(dbURI);
} else {
    console.error("❌ ERROR: Database URI nahi mil payi!");
}

// ==========================================
// 4. CORS & MIDDLEWARES (CORRECT ORDER)
// ==========================================
// Helmet ko sabse pehle allow-origin ke sath lagao
app.use(helmet({ crossOriginResourcePolicy: false }));

// Pure Express level par manual CORS headers force karo
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Preflight OPTIONS request ko turant 200 OK do
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(cors());
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