const productService = require('./productService');

exports.list = async function(req,res) {
    const perPage = 6;
    const page = req.query.page || 1;
    const size = req.query.Size;
    const color = req.query.Color;
    if(size != undefined || color != undefined){
        const count = await productService.count2(size,color);
        const products = await  productService.search(size,color,page,perPage);
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
            pages: Math.ceil(count / perPage)
        });
    }
    else{
        const count = await productService.count();
        const products = await productService.list(page,perPage);
        res.render('product/list', {
            products,
            current: page,
            pages: Math.ceil(count / perPage)
          });
    }

}

exports.detail = async function(req,res){
    const products = await productService.detail(req.params.id);
    const comments = await productService.getProductWithComment(products._id)
    const count = await productService.countComment(products._id);
    res.render('product/detail', { 
        products,
        comments,
        count,
    }); 
}

exports.category = async function(req,res) {
    const perPage = 6;
    const page = req.query.page || 1;
    const size = req.query.Size;
    const color = req.query.Color;
    const category = req.params.category;
    if(size == undefined && color == undefined && category != undefined){
        let sizeN = 0;
        let colorN = 0;
        if(typeof size == "string"){
            sizeN = 1;
        }
        if(typeof color == "string"){
            colorN = 1;
        }
        console.log(category)
        const count = await productService.count3(category);
        console.log(count)
        const products = await  productService.category(page,perPage,category);
        res.render(`category/${category}`, { 
            products,
            size:sizeN,
            color:colorN,
            sizes: size,
            colors: color,
            current: page,
            pages: Math.ceil(count / perPage)
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
            const count = await productService.count4(size,color,category);
            const products = await  productService.search2(size,color,category,page,perPage);
            res.render(`category/${category}`, { 
                products,
                size:sizeN,
                color:colorN,
                sizes: size,
                colors: color,
                current: page,
                pages: Math.ceil(count / perPage)
            });
        }
        else{
            if(size != undefined || color != undefined){
                const count = await productService.count2(size,color);
                const products = await  productService.search(size,color,page,perPage);
                res.render('product/list', { 
                    products,
                    size:sizeN,
                    color:colorN,
                    sizes: size,
                    colors: color,
                    current: page,
                    pages: Math.ceil(count / perPage)
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
        const comment = await productService.postComment(req.body.username,req.params.productID,req.body.content,req.user._id)
        res.status(201).json(comment);
    }
    else{
        if(req.body.username == ""){
            req.body.username = "Một người lạ"
        }
        const comment = await productService.postComment(req.body.username,req.params.productID,req.body.content)
        res.status(201).json(comment);
    }

    // res.redirect(`/product/detail/${req.body.productID}`)

}