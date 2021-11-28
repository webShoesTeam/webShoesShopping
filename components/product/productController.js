const productService = require('./productService');

exports.list = async function(req,res) {
    const perPage = 2;
    const page = req.params.page || 1;
    const products = await productService.list(page,perPage);
    res.render('product/list', {
        products, // sản phẩm trên một page
        current: page, // page hiện tại
      });
    // res.render('product/list', { products }); 
    // paginate = ""
    // for(i = 1 ; i <= 3 ; i++){
    //     if(i == page) paginate += `<li class=\"active\"><span>${i}</span></li>\n`
    //     paginate += `<li><a href=\"/product/${i}\">${i}</a></li>\n`
    // }
    // console.log(paginate)
    // res.render('product/list', {paginate})
}


exports.detail = async function(req,res){
    const products = await productService.detail(req.params.id);
    res.render('product/detail', { products }); 
}
