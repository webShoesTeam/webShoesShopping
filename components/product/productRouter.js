const express = require('express');
const router = express.Router();
const productController = require("./productController")

router.get('/', productController.list); 

router.get('/detail/:id', productController.detail); 

router.get('/:category',productController.category);

router.post('/:productID/comment',productController.postComment)

router.get(`/commentAPI/:productID/:page`,productController.listComment)

module.exports = router;