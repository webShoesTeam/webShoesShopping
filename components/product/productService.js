
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


exports.count2 = (sizes,colors,sort,search) => { 
    return Product.countDocuments({$or:[{color: colors},{size:sizes}], name: { $regex: search }})
    .sort({'price': sort})
}


exports.detail = (id) =>{
    return Product.findOne({_id: id})
}

exports.count3 = (cate,sort,search) => { 
    return Product.countDocuments({category: cate , name: { $regex: search }})
    .sort({'price': sort})
}

exports.search2 = (sizes,colors,cate,page,perPage,sort,search) =>{
    return Product.find({category: cate,$or:[{color: colors},{size:sizes}], name: { $regex: search }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({'price': sort})
}

exports.count4 = (sizes,colors,cate,sort,search) => { 
    return Product.countDocuments({category: cate,$or:[{color: colors},{size:sizes}] , name: { $regex: search }})
    .sort({'price': sort})
}


exports.category = (page,perPage,cate,sort,search) => {
    return Product.find({category: cate , name: { $regex: search }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({'price': sort})
}

exports.postComment = (username,productID,content,userID,image) =>{
    createAt = new Date();
    const formatted_date = createAt.getHours() 
    + ":" + createAt.getMinutes() 
    + ":" + createAt.getSeconds()
    + " " + createAt.getDate()
    + "-" + (createAt.getMonth() + 1) 
    + "-" + createAt.getFullYear();
    
    return new Comment({
        userID: userID,
        username: username,
        productID: productID,
        content: content,
        createAt: formatted_date,
        image: image
    }).save();
}

exports.getProductWithComment = (id,page,perPage)=> {
    return Comment.find({productID: id})
    .sort({'createAt': -1})
    .skip((perPage * page) - perPage)

    .limit(perPage)
}

exports.findById = async (id) =>{
    return await Product.findOne({_id: id})
}


exports.countComment = (id) => { return Comment.countDocuments({productID: id})}

exports.updateView = async (product) => {
    if (product.view) {
        product.view = product.view + 1;
    } else {
        product.view = 1;
    }
    console.log("view before: " + product.view);
    await product.save();
    console.log("view after: " + product.view);
    return product;
}