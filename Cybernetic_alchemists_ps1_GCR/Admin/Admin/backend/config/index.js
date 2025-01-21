const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Initialize the uploads directory
const initUploads = () => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    return uploadDir;
};

// Configure express app with middleware
const configureExpress = (app) => {
    // CORS configuration
    app.use(cors({
        origin: process.env.NODE_ENV === 'production' 
            ? process.env.FRONTEND_URL 
            : 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
        exposedHeaders: ['Content-Range', 'X-Content-Range'],
        maxAge: 600
    }));

    // Body parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Configure uploads directory
    const uploadsDir = initUploads();

    // Serve static files with security headers
    app.use('/uploads', (req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Content-Security-Policy', "default-src 'self'");
        next();
    }, express.static(uploadsDir));

    // Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal Server Error' });
    });

    return app;
};

module.exports = {
    configureExpress,
    initUploads
};