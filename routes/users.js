const express = require('express');
//const { render } = require('../app');
const router = express.Router();
const userController = require('../component/users/usersController');

const auth = require('../config/auth');
var isEmployee = auth.isEmployee;
var isAdmin = auth.isAdmin;
var isUser = auth.isUser;
var hasLogin = auth.hasLogin;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET register
router.get('/register', hasLogin, userController.getRegister);


// POST register
router.post('/register', userController.postRegister);

// GET login
router.get('/login', hasLogin, userController.getLogin);

// POST login
router.post('/login', userController.postLogin);

// GET logout
router.get('/logout', userController.getLogout);





module.exports = router;
