const productService = require('./productService');

exports.list = async function(req,res) {
    const perPage = 6;
    const page = req.params.page || 1;
    const count = await productService.count();
    const products = await productService.list(page,perPage);
    res.render('product/list', {
        products,
        current: page,
        pages: Math.ceil(count / perPage)
      });
}


exports.detail = async function(req,res){
    const products = await productService.detail(req.params.id);
    res.render('product/detail', { products }); 
}
