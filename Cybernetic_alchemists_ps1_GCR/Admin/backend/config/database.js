const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./logging');

dotenv.config();

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 5, // Connection pooling
        });
        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = { connectDatabase };
