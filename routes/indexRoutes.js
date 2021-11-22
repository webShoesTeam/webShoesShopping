var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shop', function(req, res, next) {
  res.render('shop', { title: 'Shop' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Shop' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Shop' });
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Shop' });
});
module.exports = router;
