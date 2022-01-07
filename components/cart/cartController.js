const Cart = require('./cartModel');
const productService = require('../product/productService');
const billService = require('../bill/billService');


exports.getCart = function(req, res) {
    // req.session.cart = {quantity: 12, name: {"product": "ad"}};
    // console.log("req cart: " + req.session.cart)
    if (typeof req.session.cart == "undefined") {
        //const cart = new Cart(req.session.cart);
        
        
        return res.render('cart', {
            title: "Cart",
        })
    } else {
        // console.log("session:\n" + JSON.stringify(req.session));
        // console.log("session cart:\n" + JSON.stringify(req.session.cart));
        const cart = new Cart(req.session.cart);
        // console.log("\ncart:\n" + JSON.stringify(cart));
        return res.render('cart', {
            title: "Cart",
            //cart: cart.getAllItems(), 
        })
    }
}

exports.addItem = async function(req, res, next) {
    // var productId = req.params.id;
    // const productId = req.query.id;
    // const quantity = req.query.quantity;
    const productId = req.body.id;
    const quantity = Number(req.body.quantity);

    // console.log("\nid: " + productId);
    // console.log("req.body: \n" + JSON.stringify(req.body));

    var cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = await productService.findById(productId);
    cart.add(product, productId, quantity);
    req.session.cart = cart;
    // console.log("session.cart: " + JSON.stringify(req.session.cart));
    res.redirect('/product/detail/' + productId);
    //res.send(cart);
    //res.status(201).json(cart);
  };

exports.addOneItem = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.addOne(productId)
    req.session.cart = cart;
    res.redirect('/cart');
};

exports.removeOneItem = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeOne(productId)
    req.session.cart = cart;
    res.redirect('/cart');
};

exports.removeItem = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
};

exports.getCheckout = async function(req, res) {

    res.render('checkout', { title: 'checkout' });
}



/*
 * post checkout
 */
exports.postCheckout = async function(req, res) {
    if (!req.user) {
        res.redirect('/login?redirect=cart/checkout')
                    
       
    }

    const cart = new Cart(req.session.cart ? req.session.cart : {});

    if (cart.totalItems == 0) {
        redirect('cart/checkout?message=cart is empty');
    }

    let bill = {};
   
    bill.userId = req.user._id;
    bill.userName = req.body.name || req.user.name;
    bill.email = req.body.email || req.user.email;
    bill.address = req.body.address || req.user.address;
    bill.phone = req.body.phone || req.user.phone;
    bill.notes = req.body.notes;
    bill.products = cart.getAllItems();
    bill.subtotal = cart.totalMoney;
    bill.total = cart.totalMoney;
    // bill.total = Math.max(total - promotion.value + ship, 0);

    // bill = await Bill.create(bill);
    
    req.session.cart = new Cart({});
    const newBill = await billService.createNewBill(bill);
    // console.log("\n\nBill: " + JSON.stringify(newBill));
    // res.render('bill', {
    //     title: 'Billing',
    //     bill: newBill,
    // });
    
    res.redirect('/bill/detail/' + newBill._id);
};