const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

// @route   GET api/inventory
// @desc    Get all inventory items
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const inventory = await Inventory.find().populate('product', ['name', 'sku']);
        res.json(inventory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/inventory/:id
// @desc    Get inventory item by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id).populate('product', ['name', 'sku']);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json(inventory);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/inventory
// @desc    Create an inventory item
// @access  Private
router.post('/', [auth, [
    check('product', 'Product is required').not().isEmpty(),
    check('quantity', 'Quantity is required').isInt({ min: 0 }),
    check('location', 'Location is required').not().isEmpty(),
    check('minimumStock', 'Minimum stock is required').isInt({ min: 0 })
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { product, quantity, location, minimumStock } = req.body;

    try {
        // Verify product exists
        const productExists = await Product.findById(product);
        if (!productExists) {
            return res.status(400).json({ message: 'Product not found' });
        }

        // Check if inventory item already exists for this product
        let inventory = await Inventory.findOne({ product });
        if (inventory) {
            return res.status(400).json({ message: 'Inventory item already exists for this product' });
        }

        // Determine status based on quantity and minimum stock
        const status = quantity === 0 ? 'out_of_stock' : 
                      quantity <= minimumStock ? 'low_stock' : 'in_stock';

        inventory = new Inventory({
            product,
            quantity,
            location,
            minimumStock,
            status
        });

        await inventory.save();
        res.json(inventory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/inventory/:id
// @desc    Update inventory item
// @access  Private
router.put('/:id', [auth, [
    check('quantity', 'Quantity must be a non-negative number').optional().isInt({ min: 0 }),
    check('location', 'Location cannot be empty').optional().not().isEmpty(),
    check('minimumStock', 'Minimum stock must be a non-negative number').optional().isInt({ min: 0 })
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let inventory = await Inventory.findById(req.params.id);

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        const { quantity, location, minimumStock } = req.body;

        if (quantity !== undefined) {
            inventory.quantity = quantity;
            // Update status based on new quantity
            inventory.status = quantity === 0 ? 'out_of_stock' : 
                             quantity <= inventory.minimumStock ? 'low_stock' : 'in_stock';
        }
        if (location) inventory.location = location;
        if (minimumStock !== undefined) {
            inventory.minimumStock = minimumStock;
            // Update status based on new minimum stock
            inventory.status = inventory.quantity === 0 ? 'out_of_stock' : 
                             inventory.quantity <= minimumStock ? 'low_stock' : 'in_stock';
        }

        inventory.lastUpdated = Date.now();
        await inventory.save();

        res.json(inventory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/inventory/:id
// @desc    Delete inventory item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);

        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        await inventory.remove();

        res.json({ message: 'Inventory item removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;