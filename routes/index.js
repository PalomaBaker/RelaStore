const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../models/index.js');

// Import route modules
const categoryRoutes = require('./api/category-routes.js');
const productRoutes = require('./api/product-routes.js');
const tagRoutes = require('./api/tag-routes.js');

// The `/api/categories` endpoint
router.use('/category', categoryRoutes);

// Define routes for products and tags
router.use('/product', productRoutes);
router.use('/tag', tagRoutes);

module.exports = router;
