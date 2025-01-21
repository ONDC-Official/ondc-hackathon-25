const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const upload = require('../middleware/multer');
const path = require('path');
const fs = require('fs');

// @route   GET api/products/search
// @desc    Search products
// @access  Private
router.get('/search', auth, async (req, res) => {
    try {
        const logger = require('../config/logging');
        const { q: searchQuery, limit = 10, skip = 0, sort = 'createdAt', category } = req.query;
        const page = parseInt(req.query.page) || 1;
        let query = {
            where: {}
        };
        
        if (searchQuery) {
            query.where = { 
                [Op.or]: [
                    { name: { [Op.like]: `%${searchQuery}%` } },
                    { description: { [Op.like]: `%${searchQuery}%` } },
                    { sku: { [Op.like]: `%${searchQuery}%` } }
                ]
            };
        }
        
        if (category) {
            query.where.category = category;
        }

        const totalCount = await Product.count(query);
        const products = await Product.findAll({
            ...query,
            order: [[sort, 'ASC']],
            limit: parseInt(limit),
            offset: (page - 1) * parseInt(limit)
        });

        res.header('X-Total-Count', totalCount);
        res.header('X-Total-Pages', Math.ceil(totalCount / limit));
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/products
// @desc    Get all products
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']],
            limit: parseInt(req.query.limit) || 10,
            offset: parseInt(req.query.skip) || 0
        });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/products
// @desc    Create a product
// @access  Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price must be a positive number').isFloat({ min: 0 }),
    check('category', 'Category is required').not().isEmpty(),
    check('stockQuantity', 'Stock quantity must be a positive number').isInt({ min: 0 }),
    check('sku', 'SKU is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        name,
        description,
        price,
        category,
        stockQuantity,
        images,
        sku,
        status
    } = req.body;

    try {
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stockQuantity,
            images,
            sku,
            status
        });

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/products/:id
// @desc    Update product
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        stockQuantity,
        images,
        sku,
        status
    } = req.body;

    try {
        let product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product = await product.update({
            name,
            description,
            price,
            category,
            stockQuantity,
            images,
            sku,
            status,
            updatedAt: new Date()
        });

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();

        res.json({ message: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
