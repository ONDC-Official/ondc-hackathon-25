const express = require('express');
const router = express.Router();

// Health check
router.get('/health', (req, res) => {
    const mongoose = require('mongoose');
    res.json({
        status: 'healthy',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Import and mount orders route
const orderRoutes = require('./orders');
router.use('/orders', orderRoutes);

module.exports = router;
router.get('/health', (req, res) => {
    const mongoose = require('mongoose');
    res.json({
        status: 'ok',
        timestamp: new Date(),
        env: process.env.NODE_ENV,
        database: {
            connected: mongoose.connection.readyState === 1,
            name: mongoose.connection.name
        },
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

module.exports = router;