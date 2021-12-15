
const Product = require('../../models/productModel');

const Comment = require('../../models/Comment')

exports.list = (page,perPage,sort,search) => {
    return Product.find( {name: { $regex: search }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({'price': sort})
}

exports.count = (search) => { return Product.countDocuments({name: { $regex: search }})}

exports.search = (sizes,colors,page,perPage,sort,search) =>{
    return Product.find({$or:[{color: colors},{size:sizes}], name: { $regex: search }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({'price': sort})
}

exports.count2 = (sizes,colors,search) => { return Product.countDocuments({$or:[{color: colors},{size:sizes}], name: { $regex: search }})}

exports.detail = (id) =>{
    return Product.findOne({_id: id})
}

exports.count3 = (cate,search) => { return Product.countDocuments({category: cate , name: { $regex: search }})}

exports.search2 = (sizes,colors,cate,page,perPage,search) =>{
    return Product.find({category: cate,$or:[{color: colors},{size:sizes}], name: { $regex: search }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.count4 = (sizes,colors,cate,search) => { return Product.countDocuments({category: cate,$or:[{color: colors},{size:sizes}] , name: { $regex: search }})}


exports.category = (page,perPage,cate,search) => {
    return Product.find({category: cate , name: { $regex: search }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
}

exports.postComment = (username,productID,content,userID) =>{
    return new Comment({
        userID: userID,
        username: username,
        productID: productID,
        content: content,
        createAt: new Date()
    }).save();
}

exports.getProductWithComment = (id,page,perPage)=> {
    return Comment.find({productID: id})
    .sort({'createAt': -1})
    .skip((perPage * page) - perPage)
    .limit(perPage);
}

exports.countComment = (id) => { return Comment.countDocuments({productID: id})}