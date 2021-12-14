const express = require('express');
const router = express.Router();
const cartController = require('./cartController');


/**
 * GET cart
 */
router.get('/', cartController.getCart);
router.post('/add', cartController.addItem);
router.get('/remove/:id', cartController.removeItem);
router.get('/removeone/:id', cartController.removeOneItem);
router.get('/add/:id', cartController.addOneItem);
router.get('/checkout', cartController.getCheckout);
router.post('/checkout', cartController.postCheckout);
module.exports = router;