const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
    },
    userName: {
        type: String,
    },
    email: {
      type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: 'processing'
    },
    address: {
        type: String,
        // required: [true, 'Please provide your address!'],
        default: ''
    },
    phone: {
        type: String,
        // required: [true, 'Please provide your phone to contact!'],
        default: ''
    },
    code: {
        type: String,
        default: ''
    },
    products: [],
    total: {
        type: Number
    },
    subtotal: {
        type: Number
    },
    notes: {
      type: String,
    } 
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;