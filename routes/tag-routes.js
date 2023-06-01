const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../models');

// GET all tags
router.get('/api/tags', async (req, res) => {
  try {
    // Fetch all tags and include the associated Product models through the ProductTag join table
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single tag by id
router.get('/api/tags/:id', async (req, res) => {
  try {
    // Find a tag by id and include the associated Product models through the ProductTag join table
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new tag
router.post('/api/tags', async (req, res) => {
  try {
    // Create a new tag using the request body data
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a tag by id
router.put('/api/tags/:id', async (req, res) => {
  try {
    // Update a tag by id with the request body data
    const [affectedRows] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a tag by id
router.delete('/api/tags/:id', async (req, res) => {
  try {
    // Delete a tag by id
    const affectedRows = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
