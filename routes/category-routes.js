const router = require('express').Router();
const { Category, Product } = require('../models');

// GET all categories
router.get('/api/categories', async (req, res) => {
  try {
    // Fetch all categories and include the associated Product models
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category by id
router.get('/api/categories/:id', async (req, res) => {
  try {
    // Find a category by id and include the associated Product models
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new category
router.post('/api/categories', async (req, res) => {
  try {
    // Create a new category using the request body data
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a category by id
router.put('/api/categories/:id', async (req, res) => {
  try {
    // Update a category by id with the request body data
    const [affectedRows] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category by id
router.delete('/api/categories/:id', async (req, res) => {
  try {
    // Delete a category by id
    const affectedRows = await Category.destroy({
      where: { id: req.params.id },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
