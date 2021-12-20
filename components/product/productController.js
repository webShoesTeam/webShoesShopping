const productService = require('./productService');

exports.list = async function(req,res) {
    const perPage = 6;
    const page = req.query.page || 1;
    const size = req.query.Size;
    const color = req.query.Color;
    const sort = req.query.sort || -1;
    var nameSearch = req.query.search;
    if(nameSearch == undefined){
        nameSearch = "";
    }
    console.log(nameSearch)
    if(size != undefined || color != undefined){
        const count = await productService.count2(size,color,sort,nameSearch);
        const products = await  productService.search(size,color,page,perPage,sort,nameSearch);
        let sizeN = 0;
        let colorN = 0;

        if(typeof size == "string"){
            sizeN = 1;
        }
        if(typeof color == "string"){
            colorN = 1;
        }
        res.render('product/list', { 
            products,
            size:sizeN,
            color:colorN,
            sizes: size,
            colors:color,
            current: page,
            pages: Math.ceil(count / perPage),
            nameSearch
        });
    }
    else{
        const count = await productService.count(nameSearch);
        const products = await productService.list(page,perPage,sort,nameSearch);
        res.render('product/list', {
            products,
            current: page,
            pages: Math.ceil(count / perPage),
            nameSearch
          });
    }

}

exports.detail = async function(req,res){
    const perPage = 6;
    const page = req.query.page || 1;
    const category = req.query.category;
    var productList = await productService.category(1,perPage,category,-1," ");
    //find not current product

    productList = productList.filter(function( obj ) {
        return obj._id != req.params.id;
    });
    let products = await productService.detail(req.params.id);
    products = await productService.updateView(products);
    const comments = await productService.getProductWithComment(products._id,page,perPage)
    const count = await productService.countComment(products._id);
    res.render('product/detail', {
        productList, 
        products,
        comments,
        count,
        pages: Math.ceil(count / perPage),
        current: page,
    }); 
}

exports.category = async function(req,res) {
    const perPage = 6;
    const page = req.query.page || 1;
    const size = req.query.Size;
    const color = req.query.Color;
    const category = req.params.category;
    const sort = req.query.sort || -1;
    var nameSearch = req.query.search;
    if(nameSearch == undefined){
        nameSearch = "";
    }
    if(size == undefined && color == undefined && category != undefined){
        let sizeN = 0;
        let colorN = 0;
        if(typeof size == "string"){
            sizeN = 1;
        }
        if(typeof color == "string"){
            colorN = 1;
        }
        const count = await productService.count3(category,sort,nameSearch);
        const products = await  productService.category(page,perPage,category,sort,nameSearch);
      
        res.render(`category/${category}`, { 
            products,
            size:sizeN,
            color:colorN,
            sizes: size,
            colors: color,
            current: page,
            pages: Math.ceil(count / perPage),
            nameSearch
        });

    }
    else if(size != undefined || color != undefined || category != undefined ){
        let sizeN = 0;
        let colorN = 0;
        if(typeof size == "string"){
            sizeN = 1;
        }
        if(typeof color == "string"){
            colorN = 1;
        }
        if(category != undefined){
            const count = await productService.count4(size,color,category,sort,nameSearch);
            const products = await  productService.search2(size,color,category,page,perPage,sort,nameSearch);
            
            res.render(`category/${category}`, { 
                products,
                size:sizeN,
                color:colorN,
                sizes: size,
                colors: color,
                current: page,
                pages: Math.ceil(count / perPage),
                nameSearch
            });
        }
        else{
            if(size != undefined || color != undefined){
                const count = await productService.count2(size,color,sort,nameSearch);
                const products = await  productService.search(size,color,page,perPage,sort,nameSearch);
                
                res.render('product/list', { 
                    products,
                    size:sizeN,
                    color:colorN,
                    sizes: size,
                    colors: color,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    nameSearch
                });
            }
        }

    }
    else{
        res.redirect('/product');
    }
}

exports.postComment = async function(req,res){

    if(req.user){
        const comment = await productService.postComment(req.body.username,req.params.productID,req.body.content,req.user._id,req.user.image)
        const count = await productService.countComment(req.params.productID);
        comment.push(count)
        res.status(201).json(comment);
    }
    else{
        if(req.body.username == ""){
            req.body.username = "Một người lạ"
        }
        const comment = await productService.postComment(req.body.username,req.params.productID,req.body.content)
        const count = await productService.countComment(req.params.productID);
        var data = []
        data.push(comment)
        data.push(count)
        res.status(201).json(data);
    }

    // res.redirect(`/product/detail/${req.body.productID}`)

}

exports.listComment = async function(req,res){
    const perPage = 6;
    const page = req.params.page || 1;
    const count = await productService.countComment(req.params.productID);
    var comments = await productService.getProductWithComment(req.params.productID,page,perPage)
    comments.push(page);
    comments.push(Math.ceil(count / perPage));
    res.status(201).json(comments);
}