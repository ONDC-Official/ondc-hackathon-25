const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            await User.create({
                username: 'admin',
                email: 'admin@admin.com',
                password: hashedPassword,
                role: 'admin',
                profile: {
                    firstName: 'Admin',
                    lastName: 'User'
                }
            });
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
        
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error setting up admin user:', error);
        process.exit(1);
    }
};

createAdminUser();