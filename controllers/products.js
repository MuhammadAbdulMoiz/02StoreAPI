const CustomError = require('../errors/customErrors');
const ProductCollection = require('../models/Product');

// Gets all products with optional filtering by 'featured' query parameter and ignores other query parameters
// Gets all products containing the matching charatcers
const getAllProducts = async (req, res) => {
    const { name, featured, company, sort } = req.query;
    const queryObj = {};
    if (featured) {
        queryObj.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObj.company = { $regex: company, $options: 'i' };
    }
    if (name) {
        queryObj.name = { $regex: name, $options: 'i' };
    }
    let results = ProductCollection.find(queryObj);
    if (sort){
        const sortList = sort.split(',').join(' ');
        results = results.sort(sortList);
    }else {
        results = results.sort('createdAt');
    }
    const products = await results;
    if (!products) {
        throw new CustomError('No products found for the given query', 404);
    }
    res.status(200).json({ message: products, nbHits: products.length });
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

const queryProducts = async (req, res) => {
    const products = await ProductCollection.find(req.query);
    if (!products) {
        throw new CustomError('No products found for the given query', 404);
    }
    res.status(200).json({ message: products, nbHits: products.length });
}

const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await ProductCollection.findById(id);
    if (!product) {
        throw new CustomError(`No product with id: ${id}`, 404);
    }
    res.status(200).json({ message: product });
}

module.exports = {getAllProducts, queryProducts, featuredProducts, createProduct, getProduct};