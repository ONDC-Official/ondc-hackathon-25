const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

dotenv.config();
const app = express();

// Initialize logger and security
const logger = require('./config/logging');
const { connectDatabase } = require('./config/database');
const helmet = require('helmet');
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'blob:'],
            scriptSrc: ["'self'"]
        }
    }
}));

// Enable compression
app.use(compression());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/api', require('./routes/api'));

// Middleware
// CORS configuration with security options
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600 // 10 minutes
}));
// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    logger.info('Created uploads directory');
}

// Security middleware must be after body parser
app.use(require('./config/security'));

// File Upload Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files
// Serve static files with security headers
app.use('/uploads', (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
}, express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const downloadRoutes = require('./routes/download');
const orderRoutes = require('./routes/orders');
const customerRoutes = require('./routes/customers');
const inventoryRoutes = require('./routes/inventory');
const profileRoutes = require('./routes/profile');

// Initialize all API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Configure security
require('./config/security')(app);

(async () => {
    try {
        await connectDatabase();
        logger.info('Database connection established');
        
        const server = app.listen(process.env.PORT || 5000, () => {
            logger.info(`Server running on port ${process.env.PORT || 5000}`);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            logger.info('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                mongoose.connection.close(false, () => {
                    logger.info('Process terminated');
                    process.exit(0);
                });
            });
        });

    } catch (err) {
        logger.error('Failed to initialize:', err);
        process.exit(1);
    }
})();

// Global error handlers
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', { error: err.message, stack: err.stack });
    if (server) {
        server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err);
    if (server) {
        server.close(() => process.exit(1));
    } else {
        process.exit(1);
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// API Rate limiting
const rateLimit = require('express-rate-limit');
app.use('/api', rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
}));

// Export app for use in index.js
module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
