var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    flag: req.query.fl
  });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'aboutus' });
});

// router.get('/cart', function(req, res, next) {
//   res.render('cart', { title: 'cart' });
// });

// router.get('/checkout', function(req, res, next) {
//   res.render('checkout', { title: 'checkout' });
// });


router.get('/thankyou', function(req, res, next) {
  res.render('thankyou', { title: 'thank you' });
});

module.exports = router;
