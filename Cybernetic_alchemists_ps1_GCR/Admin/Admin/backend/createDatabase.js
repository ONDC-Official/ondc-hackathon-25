const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
        createProductsSchema();
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const createProductsSchema = () => {
    const productSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            stockQuantity: {
                type: Number,
                default: 0,
            },
            images: {
                type: [String], // Array of image URLs
            },
            sku: {
                type: String,
                unique: true,
                required: true,
            },
            status: {
                type: String,
                enum: ['active', 'inactive', 'discontinued'],
                default: 'active',
            },
        },
        {
            timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
        }
    );

    // Register the schema as a model
    const Product = mongoose.model('Product', productSchema);

    console.log('Products schema created successfully');
};

connectDatabase();

