// Main application entry point
const app = require('./server');
const { connectDatabase } = require('./config/database'); // Updated import
const mongoose = require('mongoose');
const logger = require('./config/logging');

// Connect to MongoDB
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
