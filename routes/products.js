const express = require('express');
const router = express.Router();
const { getAllProducts, queryProducts, featuredProducts, createProduct, getProduct } = require('../controllers/products');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/featured').get(featuredProducts);
router.route('/:id').get(getProduct);
router.route('/query').get(queryProducts);

module.exports = router;