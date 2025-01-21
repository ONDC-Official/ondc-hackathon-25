const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

module.exports = (app) => {
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

    // Rate limiting
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Too many requests, please try again later'
    }));

    // Static files with security headers
    app.use('/uploads', (req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Content-Security-Policy', "default-src 'self'");
        next();
    }, express.static(path.join(__dirname, '..', 'uploads')));

    // Error handling
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal Server Error' });
    });

    return app;
};