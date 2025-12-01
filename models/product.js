const moongoose = require('mongoose');

const ProductSchema = new moongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        default: 0,
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
        },
        required: [true, 'Product company is required'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = moongoose.model('Product', ProductSchema);