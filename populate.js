require('dotenv').config();
const ProductCollection = require('./models/Product');
const productsList = require('./products.json');
const connectDB = require('./connectDB/connecion');

const uri = process.env.MONGO_URI;

const start =  async () => {
    try {
        await connectDB(uri);
        await ProductCollection.deleteMany();
        await ProductCollection.create(productsList);
        console.log('Products populated successfully');
        process.exit(0);
    }
    catch (error) {
        console.log(error);
    }
}

start();
