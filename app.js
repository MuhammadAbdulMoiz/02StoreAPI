require('dotenv').config();
require('express-async-errors');
const connectDB = require('./connectDB/connecion');

const express = require('express');
const app = express();

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const productsRouter = require('./routes/products');

// middleware
app.use(express.json());

//routes
app.get('/api/v1', (req, res) => {
    res.send('<h1>Store API</h1><p>Welcome to the Store API</p><a href="/api/v1/products">Products Route</a>');
});

app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;
const url = process.env.MONGO_URI;
const start = async () => {
    try {
        await connectDB(url);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();