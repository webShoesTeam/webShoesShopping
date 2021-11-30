

const Product = require('../../models/productModel');

exports.list = (page,perPage) => {
    return Product.find()
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.detail = (id) =>{
    return Product.findOne({_id: id})
}

exports.count = () => { return Product.countDocuments()}