

const Product = require('../../models/productModel');

exports.list = (page,perPage) => {
    return Product.find()
    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
}

exports.detail = (id) =>{
    return Product.findOne({_id: id})
}