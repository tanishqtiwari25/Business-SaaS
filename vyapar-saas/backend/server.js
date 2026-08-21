// ==========================================
// 1. DOTENV CONFIGURATION (Top Priority)
// ==========================================
const path = require('path');
const dotenv = require('dotenv');

// Agar future mein .env chalana ho toh uski config
dotenv.config({ path: path.join(process.cwd(), '.env') });

// ==========================================
// 2. MODULE IMPORTS (Sabhse Pehle Imports)
// ==========================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db'); // Ab ye import pehle ho gaya hai!

// Routes Imports
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const syncRoutes = require('./routes/syncRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

// ==========================================
// 3. APPLICATION SETUP & DATABASE
// ==========================================
const app = express();

// Direct bypass connection string agar .env nahi chal raha toh
const MONGO_URI_DIRECT = "mongodb+srv://realtanishqtiwari:Ramandatabasehh@cluster0.lntmazo.mongodb.net/?appName=Cluster0";

// Database connect karo (Pehle .env check karega, nahi toh direct link use karega)
const dbURI = process.env.MONGO_URI || MONGO_URI_DIRECT;

if (dbURI) {
    connectDB(dbURI); // Sahi tarike se connect call
} else {
    console.error("❌ ERROR: Database URI nahi mil payi!");
}

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// ==========================================
// 4. API ROUTES
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/purchases', purchaseRoutes);

// ==========================================
// 5. SERVER START
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Production Architecture listening on port ${PORT}`);
});