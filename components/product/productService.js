
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

exports.count2 = (sizes,colors) => { return Product.countDocuments({$or:[{color: colors},{size:sizes}]})}

exports.count3 = (cate) => { return Product.countDocuments({category: cate})}

exports.search = (sizes,colors,page,perPage) =>{
    return Product.find({$or:[{color: colors},{size:sizes}]})
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.count4 = (sizes,colors,cate) => { return Product.countDocuments({category: cate,$or:[{color: colors},{size:sizes}]})}

exports.search2 = (sizes,colors,cate,page,perPage) =>{
    return Product.find({category: cate,$or:[{color: colors},{size:sizes}]})
    .skip((perPage * page) - perPage)
    .limit(perPage)
}


exports.category = (page,perPage,cate) => {
    return Product.find({category: cate})
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.findById = async (id) =>{
    return await Product.findOne({_id: id})
}

exports.count = () => { return Product.countDocuments()}

