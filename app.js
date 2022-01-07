const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./components/product/productRouter')
const authRouter = require('./components/auth/authRouter');
const passport = require('./passport');
const authGuard = require('./middlewares/authGuard');
const cartRouter = require('./components/cart/cartRouter');
const Cart = require('./components/cart/cartModel');
const billRouter = require('./components/bill/billRouter');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));


app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // console.log('in use local')
  res.locals.user = req.user;
  // console.log("local: \n" + JSON.stringify(res.locals));
  req.session.cart = new Cart(req.session.cart ? req.session.cart : {});
  res.locals.session = req.session;

  next();
})

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/product',productRouter)
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/bill', billRouter);

app.get('/test', (req, res) => {
  res.render('product/single')
} )
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
