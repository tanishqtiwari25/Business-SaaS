const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'vyapar_secret_key_123', { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { name, email, password, role, permissions } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

    const user = await User.create({ name, email, password, role, permissions });
    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      if (!user.isActive) return res.status(403).json({ success: false, message: 'Account deactivated by Owner' });
      
      res.json({
        success: true,
        token: generateToken(user._id),
        user: { id: user._id, name: user.name, role: user.role, permissions: user.permissions }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};