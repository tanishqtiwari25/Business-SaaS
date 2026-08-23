const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "vyapar_secret_key_123",
    { expiresIn: "30d" }
  );
};

// ==========================================
// REGISTER USER
// ==========================================
exports.registerUser = async (req, res) => {
  console.log("🔥 REGISTER API HIT");
  console.log("📦 REGISTER BODY:", req.body);

  try {
    const { name, email, password, role, permissions } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    console.log("🔍 Checking existing user...");

    const userExists = await User.findOne({
      email: normalizedEmail,
    });

    console.log("🔍 User exists:", !!userExists);

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    console.log("👤 Creating user...");

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: role || "Staff",
      permissions: permissions || {},
    });

    console.log("✅ User created:", user._id.toString());

    const token = generateToken(user._id);

    console.log("🔑 Token generated");

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

// ==========================================
// LOGIN USER
// ==========================================
exports.loginUser = async (req, res) => {
  console.log("🔐 LOGIN API HIT");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account deactivated by Owner",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};