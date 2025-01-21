const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

// @route   GET api/orders
// @desc    Get all orders
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', ['firstName', 'lastName', 'email'])
            .populate('products.product', ['name', 'sku']);
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;