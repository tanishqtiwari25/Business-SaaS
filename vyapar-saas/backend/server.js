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
// 4. CORS & MIDDLEWARES (FINAL FIX)
// ==========================================
// Dynamic origin handling (Vercel ke kisi bhi URL/Domain ko allow karne ke liye)
const corsOptions = {
    origin: function (origin, callback) {
        // Postman / Server-to-Server requests (jahan origin null hota hai) aur saare frontend origins allow karo
        if (!origin || origin.includes('vercel.app') || origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(null, true); // Fallback: kisi bhi domain se block na ho
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200 // Older browsers support ke liye
};

// CORS ko Helmet se bilkul pehle apply karo
app.use(cors(corsOptions));

// Pre-flight OPTIONS request handling sabhi routes par
app.options('*', cors(corsOptions));

app.use(helmet({ crossOriginResourcePolicy: false }));
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