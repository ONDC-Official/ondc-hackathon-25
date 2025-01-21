const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const upload = require('../middleware/multer');

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', auth, async (req, res) => {
    const logger = require('../config/logging');
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile
// @desc    Update user profile
// @access  Private
router.put('/', auth, async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, address } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profile = {
            ...user.profile,
            firstName: firstName || user.profile.firstName,
            lastName: lastName || user.profile.lastName,
            phoneNumber: phoneNumber || user.profile.phoneNumber,
            address: address || user.profile.address
        };

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile/avatar
// @desc    Upload profile avatar
// @access  Private
router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profile.avatar = `/uploads/${req.file.filename}`;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;