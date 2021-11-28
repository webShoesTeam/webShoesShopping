var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
// var auth = require('../config/auth');
// var isUser = auth.isUser;

// Get Product model
const Product = require('../models/productModel');

// Get Category model
const Category = require('../models/categoryModel');
var auth = require('../config/auth');
var isEmployee = auth.isEmployee;
var isAdmin = auth.isAdmin;
var isUser = auth.isUser;
var hasLogin = auth.hasLogin;
/*
 * GET all products
 */
router.get('/', function (req, res) {
//router.get('/', isUser, function (req, res) {

    Product.find(function (err, products) {
        if (err)
            console.log(err);

        res.render('all_products', {
            title: 'All products',
            products: products,
            user: req.user
        });
    });
});


/*
 * GET products by category
 */
router.get('/:category', function (req, res) {

    var categorySlug = req.params.category;

    Category.findOne({slug: categorySlug}, function (err, c) {
        Product.find({category: categorySlug}, function (err, products) {
            if (err)
                console.log(err);

            res.render('cat_products', {
                title: c.title,
                products: products,
                user: req.user
            });
        });
    });

});

/*
 * GET product details
 */
router.get('/:category/:product', function (req, res) {

    var galleryImages = null;
    const loggedIn = true;
    // const loggedIn = (req.isAuthenticated()) ? true : false;

    Product.findOne({slug: req.params.product}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            var galleryDir = 'public/product_images/' + product._id + '/gallery';

            fs.readdir(galleryDir, function (err, files) {
                if (err) {
                    console.log(err);
                } else {
                    galleryImages = files;

                    res.render('product', {
                        title: product.title,
                        p: product,
                        galleryImages: galleryImages,
                        loggedIn: loggedIn,
                        user: req.user
                    });
                }
            });
        }
    });

});

// Exports
module.exports = router;


