const express = require('express');
const router = express.Router();
const productController = require("./productController")

router.get('/', productController.list); 

router.get('/:page', productController.list); 


router.get('/detail/:id', productController.detail); 

module.exports = router;