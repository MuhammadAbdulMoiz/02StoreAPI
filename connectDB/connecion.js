require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async (url) => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
}

module.exports = connectDB;