const router = require('express').Router();
const { Product, Category, Tag } = require('../models');

// GET all products
router.get('/api/products', async (req, res) => {
  try {
    // Fetch all products and include the associated Category and Tag models
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by id
router.get('/api/products/:id', async (req, res) => {
  try {
    // Find a product by id and include the associated Category and Tag models
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new product
router.post('/api/products', async (req, res) => {
  try {
    // Create a new product using the request body data
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a product by id
router.put('/api/products/:id', async (req, res) => {
  try {
    // Update a product by id with the request body data
    const [affectedRows] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a product by id
router.delete('/api/products/:id', async (req, res) => {
  try {
    // Delete a product by id
    const affectedRows = await Product.destroy({
      where: { id: req.params.id },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
