const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
};

// Check Dynamic Permissions
const authorize = (permissionName) => {
  return (req, res, next) => {
    if (req.user.role === 'Owner') return next(); // Owner bypasses all check
    if (req.user.permissions && req.user.permissions[permissionName]) {
      return next();
    }
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient Permissions' });
  };
};

module.exports = { protect, authorize };