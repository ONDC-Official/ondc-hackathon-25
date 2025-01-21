const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

module.exports = (app) => {
    // Basic security headers
    app.use(helmet());

    // Rate limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later'
    });

    // Apply rate limiting to all routes
    app.use('/api/', limiter);

    // CORS headers
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';");
        next();
    });

    return app;
};