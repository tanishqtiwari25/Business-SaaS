// ==========================================
// 1. DOTENV CONFIGURATION
// ==========================================
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: path.join(process.cwd(), ".env"),
});

// ==========================================
// 2. MODULE IMPORTS
// ==========================================
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const syncRoutes = require("./routes/syncRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

// ==========================================
// 3. APPLICATION SETUP
// ==========================================
const app = express();

// ==========================================
// 4. DATABASE CONNECTION
// ==========================================
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
    console.error("❌ ERROR: MONGO_URI environment variable nahi mili!");
    process.exit(1);
}

connectDB(dbURI);

// ==========================================
// 5. CORS CONFIGURATION
// ==========================================

// Production frontend
const allowedOrigins = [
    "https://business-saa-s-w3pr-smoky.vercel.app",

    // Local development
    "http://localhost:5173",
    "http://localhost:3000",
];

// CORS middleware
app.use(
    cors({
        origin: function (origin, callback) {

            // Postman / server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            // Exact allowed origins
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            // Vercel preview deployments
            if (
                origin.endsWith(".vercel.app") &&
                origin.startsWith("https://")
            ) {
                return callback(null, true);
            }

            console.log("❌ CORS blocked origin:", origin);

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        credentials: true,

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS",
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
        ],

        optionsSuccessStatus: 204,
    })
);

// ==========================================
// 6. SECURITY MIDDLEWARE
// ==========================================
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

// ==========================================
// 7. BODY PARSER
// ==========================================
app.use(express.json());

// ==========================================
// 8. HEALTH CHECK
// ==========================================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Vyapar SaaS API is running successfully 🚀",
    });
});

// ==========================================
// 9. API ROUTES
// ==========================================
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/sync", syncRoutes);

app.use("/api/purchases", purchaseRoutes);

// ==========================================
// 10. 404 HANDLER
// ==========================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});

// ==========================================
// 11. GLOBAL ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.message);

    // CORS error
    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({
            success: false,
            message: "CORS policy blocked this request.",
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ==========================================
// 12. SERVER START
// ==========================================
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("==========================================");
    console.log("🚀 Vyapar SaaS Backend Started");
    console.log(`🌐 Port: ${PORT}`);
    console.log("🔐 CORS: Enabled");
    console.log("==========================================");
});