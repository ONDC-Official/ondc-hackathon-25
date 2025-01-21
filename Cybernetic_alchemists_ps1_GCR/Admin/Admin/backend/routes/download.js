const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

// @route   GET api/download/:filename
// @desc    Download a file
// @access  Private
// Sanitize filename
const sanitizeFilename = (filename) => {
    return path.basename(filename).replace(/[^a-zA-Z0-9.-]/g, '_');
};

router.get('/:filename', auth, async (req, res) => {
    const logger = require('../config/logging');
    try {
        const filename = sanitizeFilename(req.params.filename);
        const file = path.join(__dirname, '../uploads', filename);
        
        if (fs.existsSync(file)) {
            res.download(file, path.basename(file));
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;