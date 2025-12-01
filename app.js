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
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Store API Documentation</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    padding: 20px;
                }
                .container {
                    max-width: 1000px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 50px 40px;
                    text-align: center;
                }
                .header h1 {
                    font-size: 3.5em;
                    margin-bottom: 10px;
                    font-weight: 700;
                }
                .header p {
                    font-size: 1.2em;
                    opacity: 0.95;
                    font-weight: 300;
                }
                .content {
                    padding: 50px;
                }
                h2 {
                    color: #667eea;
                    margin: 30px 0 20px 0;
                    font-size: 1.8em;
                    border-bottom: 3px solid #667eea;
                    padding-bottom: 10px;
                }
                h2:first-child {
                    margin-top: 0;
                }
                ul {
                    list-style: none;
                }
                li {
                    margin: 25px 0;
                    padding: 20px;
                    background: #f8f9fa;
                    border-left: 5px solid #667eea;
                    border-radius: 5px;
                    transition: all 0.3s;
                }
                li:hover {
                    background: #f0f1ff;
                    transform: translateX(5px);
                }
                a {
                    color: #667eea;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1.1em;
                    transition: color 0.3s;
                }
                a:hover {
                    color: #764ba2;
                    text-decoration: underline;
                }
                small {
                    display: block;
                    margin-top: 15px;
                    color: #666;
                }
                small ul {
                    margin: 10px 0;
                    padding-left: 20px;
                }
                small li {
                    background: white;
                    border-left-color: #764ba2;
                    margin: 8px 0;
                    padding: 10px 15px;
                    font-size: 0.95em;
                }
                code {
                    background: #f0f1ff;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                    color: #764ba2;
                }
                pre {
                    background: #2d2d2d;
                    color: #f8f8f2;
                    padding: 20px;
                    border-radius: 8px;
                    overflow-x: auto;
                    font-family: 'Courier New', monospace;
                    font-size: 1em;
                    line-height: 1.5;
                    margin: 20px 0;
                    box-shadow: inset 0 2px 5px rgba(0,0,0,0.3);
                }
                .method-badge {
                    display: inline-block;
                    background: #49cc90;
                    color: white;
                    padding: 5px 12px;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 0.9em;
                    margin-right: 10px;
                }
                .method-badge.post {
                    background: #49cc90;
                }
                .method-badge.get {
                    background: #61affe;
                }
                p {
                    color: #333;
                    line-height: 1.8;
                    font-size: 1.05em;
                }
                strong {
                    color: #667eea;
                    font-weight: 600;
                }
                .footer {
                    background: #f8f9fa;
                    padding: 30px;
                    text-align: center;
                    color: #666;
                    border-top: 1px solid #e9ecef;
                }
                .footer p {
                    margin: 0;
                    font-size: 0.95em;
                }
                @media (max-width: 768px) {
                    .container {
                        border-radius: 10px;
                    }
                    .content {
                        padding: 30px;
                    }
                    .header h1 {
                        font-size: 2.5em;
                    }
                    h2 {
                        font-size: 1.5em;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🏪 Store API</h1>
                    <p>Welcome to the Store API Documentation</p>
                </div>
                <div class="content">
                    <h2> Product Routes</h2>
                    <ul>
                        <li>
                            <span class="method-badge get">GET</span>
                            <a href="/api/v1/products">All Products</a><br>
                            <small>
                                Get all products with advanced filtering, sorting, and pagination
                                <ul>
                                    <li><strong>Examples:</strong></li>
                                    <li><a href="/api/v1/products?name=chair">Filter by name: /products?name=chair</a></li>
                                    <li><a href="/api/v1/products?company=ikea">Filter by company: /products?company=ikea</a></li>
                                    <li><a href="/api/v1/products?featured=true">Featured products: /products?featured=true</a></li>
                                    <li><a href="/api/v1/products?sort=price,-rating">Sort: /products?sort=price,-rating</a></li>
                                    <li><a href="/api/v1/products?fields=name,price,company">Select fields: /products?fields=name,price,company</a></li>
                                    <li><a href="/api/v1/products?numericFilters=price>30,rating>=4.5">Numeric filters: /products?numericFilters=price>30,rating>=4.5</a></li>
                                    <li><a href="/api/v1/products?page=1&limit=5">Pagination: /products?page=1&limit=5</a></li>
                                </ul>
                            </small>
                        </li>

                        <li>
                            <span class="method-badge get">GET</span>
                            <a href="/api/v1/products/featured">Featured Products</a><br>
                            <small>Get all products marked as featured</small>
                        </li>

                        <li>
                            <span class="method-badge get">GET</span>
                            <a href="/api/v1/products/query">Query Products</a><br>
                            <small>Custom query endpoint for flexible product searching with any query parameters</small>
                        </li>

                        <li>
                            <span class="method-badge get">GET</span>
                            <a href="/api/v1/products/your-product-id-here">Get Product by ID</a><br>
                            <small>Replace <code>your-product-id-here</code> with a real MongoDB product ID to retrieve a specific product</small>
                        </li>
                    </ul>

                    <h2> Create Product</h2>
                    <p><span class="method-badge post">POST</span> to <a href="/api/v1/products">/api/v1/products</a> with JSON body:</p>
                    <pre>{
    "name": "Example Product",
    "price": 999,
    "company": "example",
    "featured": true,
    "rating": 4.5
}</pre>

                    <h2> Query Parameters Guide</h2>
                    <ul>
                        <li><strong>name</strong> - Filter by product name (case-insensitive)</li>
                        <li><strong>company</strong> - Filter by company name (case-insensitive)</li>
                        <li><strong>featured</strong> - Filter by featured status (true/false)</li>
                        <li><strong>sort</strong> - Sort by fields (e.g., "price,-rating" for ascending price and descending rating)</li>
                        <li><strong>fields</strong> - Select specific fields (comma-separated, e.g., "name,price,company")</li>
                        <li><strong>numericFilters</strong> - Filter by numeric values (operators: >, >=, =, <, <=)</li>
                        <li><strong>page</strong> - Page number for pagination (default: 1)</li>
                        <li><strong>limit</strong> - Items per page (default: 10)</li>
                    </ul>
                </div>
                <div class="footer">
                    <p> Store API v1.0 | Built with Node.js & Express | MongoDB Database</p>
                </div>
            </div>
        </body>
        </html>
    `);

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