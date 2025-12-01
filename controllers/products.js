const CustomError = require('../errors/customErrors');
const ProductCollection = require('../models/Product');

const getAllProducts = async (req, res) => {
    const products = await ProductCollection.find({});
    res.status(200).json({ message: products });
}

const featuredProducts = async (req, res) => {
    const products = await ProductCollection.find({ featured: true });
    res.status(200).json({ message: products, nbHits: products.length });
}

const createProduct = async (req, res) => {
    const product = await ProductCollection.create(req.body);
    if (!product) {
        throw new CustomError('Product creation failed', 400);
    }
    res.status(201).json({ message: 'Create product' });
}

const getProduct = async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductCollection.findById(id);
    if (!product) {
        throw new CustomError(`No product with id: ${id}`, 404);
    }
    res.status(200).json({ message: product });
}

module.exports = {getAllProducts, featuredProducts, createProduct, getProduct};