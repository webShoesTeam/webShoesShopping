const express = require('express');
const router = express.Router();
const cartController = require('./cartController');


/**
 * GET cart
 */
router.get('/', cartController.getCart);
router.get('/add/:id', cartController.addItem);
router.get('/remove/:id', cartController.removeItem);
module.exports = router;