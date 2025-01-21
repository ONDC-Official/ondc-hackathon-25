const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'Token is not valid - User not found' });
        }

        req.user = {
            id: user._id,
            role: user.role,
            username: user.username
        };
        next();
    } catch (err) {
        const logger = require('../config/logging');
        logger.error('Auth error:', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};