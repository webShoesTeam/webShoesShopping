const mongoose = require('mongoose');
// const slugify = require('slugify');

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
  view: {
    type: Number,
    default: 0,
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
  },
  galleryImageLinks: {
    type: Array,
    default: [],
  }

});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
