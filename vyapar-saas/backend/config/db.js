const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Direct Atlas connection string (No dependency on .env for now)
    const connectionString = "mongodb+srv://realtanishqtiwari:alongwithbase@cluster0.lntmazo.mongodb.net/vyapar_db?retryWrites=true&w=majority";

    console.log("⏳ MongoDB connect karne ki koshish chal rahi hai...");

    const options = {
      serverSelectionTimeoutMS: 5000, // Agar 5 seconds me connect na ho toh timeout
    };

    const conn = await mongoose.connect(connectionString, options);
    console.log(`🍃 MongoDB Connected Successfully: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error(`❌ DATABASE CONNECTION FAILED: ${error.message}`);
    process.exit(1); // Yeh zaroori hai taaki connection fail hone par server turant crash ho aur error dikhe!
  }
};

module.exports = connectDB;