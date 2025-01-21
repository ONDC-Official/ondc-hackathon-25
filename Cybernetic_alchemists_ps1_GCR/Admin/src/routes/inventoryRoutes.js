const express = require('express');
const router = express.Router();
const { Product } = require('../models/product'); // Adjust the path as necessary
const { Customer } = require('../models/customer'); // Assuming Customer model exists

// Add Product
router.post('/add', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Product
router.put('/update/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Product
router.delete('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { status: 'inactive' });
    res.status(200).json({ success: true, message: 'Product marked as inactive' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch Product List
router.get('/list', async (req, res) => {
  try {
    const { category, status } = req.query;
    const filters = {};
    if (category) filters.category = category;
    if (status) filters.status = status;

    const products = await Product.find(filters);
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Low Stock Alerts
router.get('/low-stock', async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lt: 10 } }); // Example threshold
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch Customer List
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find(); // Assuming Customer model exists
    res.status(200).json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
