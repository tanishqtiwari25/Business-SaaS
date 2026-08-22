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
// 4. CORS
// ==========================================
const allowedOrigins = [
    "https://business-saa-s-w3pr-smoky.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            if (
                origin.startsWith("https://") &&
                origin.endsWith(".vercel.app")
            ) {
                return callback(null, true);
            }

            console.log("❌ CORS blocked origin:", origin);

            return callback(new Error("Not allowed by CORS"));
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
// 5. SECURITY
// ==========================================
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

// ==========================================
// 6. BODY PARSER
// ==========================================
app.use(express.json());

// ==========================================
// 7. HEALTH CHECK
// ==========================================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Vyapar SaaS API is running successfully 🚀",
    });
});

// ==========================================
// 8. API ROUTES
// ==========================================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/purchases", purchaseRoutes);

// ==========================================
// 9. 404 HANDLER
// ==========================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});

// ==========================================
// 10. GLOBAL ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.message);

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
// 11. START SERVER
// ==========================================
const PORT = process.env.PORT || 10000;

const startServer = async () => {
    try {
        const dbURI = process.env.MONGO_URI;

        if (!dbURI) {
            throw new Error("MONGO_URI environment variable nahi mili.");
        }

        // Database connect hone ke baad server start hoga
        await connectDB(dbURI);

        app.listen(PORT, "0.0.0.0", () => {
            console.log("==========================================");
            console.log("🚀 Vyapar SaaS Backend Started");
            console.log(`🌐 Server running on port ${PORT}`);
            console.log("🍃 MongoDB connected");
            console.log("🔐 CORS enabled");
            console.log("==========================================");
        });
    } catch (error) {
        console.error("❌ SERVER STARTUP FAILED:");
        console.error(error.message);

        process.exit(1);
    }
};

startServer();