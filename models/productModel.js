const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String
  },
  detail: {
    type: String,
    trim: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  nameImage: {
    type: String
  },
  size: {
    type: String
  },
  color:{
    type: String
  }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
