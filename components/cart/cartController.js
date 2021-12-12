const Cart = require('./cartModel');
const productService = require('../product/productService');


exports.getCart = function(req, res) {
    // req.session.cart = {quantity: 12, name: {"product": "ad"}};
    // console.log("req cart: " + req.session.cart)
    if (typeof req.session.cart == "undefined") {
        //const cart = new Cart(req.session.cart);
        
        
        return res.render('cart', {
            title: "Cart",
        })
    } else {
        console.log("session:\n" + JSON.stringify(req.session));
        console.log("session cart:\n" + JSON.stringify(req.session.cart));
        const cart = new Cart(req.session.cart);
        return res.render('cart', {
            title: "Cart",
            cart: cart.getAllItems(), 
        })
    }
}

exports.addItem = async function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = await productService.findById(productId);
    cart.add(product, productId);
    req.session.cart = cart;
    res.redirect('/');
  };

exports.removeItem = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
};