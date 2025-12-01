# Store API
A Node.js Express-based REST API for managing and retrieving product data with advanced filtering, sorting, and pagination capabilities.

## Description
Store API is a comprehensive backend service that provides endpoints for managing products in an e-commerce store. It supports filtering by multiple criteria (name, company, featured status), numeric comparisons (price, rating), sorting, field selection, and pagination. The API is built with Express.js, MongoDB, and includes error handling middleware for robust error management.

## Project Structure
```
02StoreAPI/
├── app.js                          # Main application entry point
├── package.json                    # Dependencies and project metadata
├── populate.js                     # Database population script
├── products.json                   # Sample product data
├── connectDB/
│   └── connection.js               # MongoDB connection setup
├── controllers/
│   └── products.js                 # Product controller logic
├── db/
│   └── connect.js                  # Database connection utilities
├── errors/
│   └── customErrors.js             # Custom error class
├── middleware/
│   ├── error-handler.js            # Global error handling middleware
│   └── not-found.js                # 404 not found middleware
├── models/
│   └── product.js                  # Product schema and model
└── routes/
    └── products.js                 # Product routes
```

## Tools & Technologies
- **Runtime**: Node.js
- **Framework**: Express.js - Web application framework
- **Database**: MongoDB - NoSQL database
- **Validation**: Mongoose - MongoDB object modeling
- **Environment**: dotenv - Environment variable management
- **Error Handling**: express-async-errors - Async error handling middleware
- **HTTP Client**: Postman/cURL - API testing

## Routes & Methods

### Base Route
- **GET** `/api/v1` - Welcome page with API documentation

### Product Routes
All routes are prefixed with `/api/v1/products`

#### 1. Get All Products (with Advanced Filtering)
- **Endpoint**: `GET /`
- **Query Parameters**:
  - `featured` (boolean) - Filter by featured products (true/false)
  - `company` (string) - Filter by company name (case-insensitive regex)
  - `name` (string) - Filter by product name (case-insensitive regex)
  - `sort` (string) - Sort by fields (comma-separated, e.g., "createdAt,-price")
  - `fields` (string) - Select specific fields (comma-separated)
  - `numericFilters` (string) - Filter by numeric values (e.g., "price>100,rating>=4")
  - `page` (number) - Page number for pagination (default: 1)
  - `limit` (number) - Items per page (default: 10)
- **Description**: Retrieve all products with optional filtering, sorting, and pagination

#### 2. Create Product
- **Endpoint**: `POST /`
- **Body**: JSON product object
- **Description**: Create a new product

#### 3. Get Featured Products
- **Endpoint**: `GET /featured`
- **Description**: Get all products marked as featured

#### 4. Get Single Product
- **Endpoint**: `GET /:id`
- **Parameters**: MongoDB product ID
- **Description**: Get a specific product by ID

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 02StoreAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/store
   ```

4. **Populate Database**
   ```bash
   node populate.js
   ```

5. **Start the Server**
   ```bash
   npm start
   ```

## Usage Examples

### Get all products with filtering and pagination
```bash
GET /api/v1/products?featured=true&page=1&limit=10
```

### Filter by price range
```bash
GET /api/v1/products?numericFilters=price>50,price<200&sort=-createdAt
```

### Search by company with specific fields
```bash
GET /api/v1/products?company=samsung&fields=name,price,rating
```

### Create a new product
```bash
POST /api/v1/products
Content-Type: application/json

{
  "name": "Product Name",
  "price": 99.99,
  "featured": true,
  "company": "Sony",
  "rating": 4.5
}
```

## ⚠️ Error Handling
- All errors are handled by custom error middleware
- Returns appropriate HTTP status codes
- Provides descriptive error messages
- Logs errors for debugging

