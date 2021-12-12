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
    // var productId = req.params.id;
    // const productId = req.query.id;
    // const quantity = req.query.quantity;
    const productId = req.body.id;
    const quantity = Number(req.body.quantity);

    console.log("\nid: " + productId);
    console.log("req.body: \n" + JSON.stringify(req.body));

    var cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = await productService.findById(productId);
    cart.add(product, productId, quantity);
    req.session.cart = cart;
    console.log("session.cart: " + JSON.stringify(req.session.cart));
    res.redirect('/product/detail/' + productId);
    //res.send(cart);
    //res.status(201).json(cart);
  };

exports.removeItem = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
};