const mongoose = require("mongoose");

const connectDB = async (connectionString) => {
    try {
        if (!connectionString) {
            throw new Error("MONGO_URI environment variable nahi mili.");
        }

        console.log("⏳ MongoDB connect karne ki koshish chal rahi hai...");

        const conn = await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log(
            `🍃 MongoDB Connected Successfully: ${conn.connection.host} ✅`
        );

        return conn;
    } catch (error) {
        console.error("❌ DATABASE CONNECTION FAILED:");
        console.error(error.message);

        throw error;
    }
};

module.exports = connectDB;