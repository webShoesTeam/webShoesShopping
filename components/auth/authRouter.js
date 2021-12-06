const express = require('express');
const router = express.Router();
const authController = require("./authController");
const passport = require('../../passport');
const authGuard = require('../../middlewares/authGuard');

router.get('/login', authGuard.notLogin, authController.login);

// POST login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?wrong-password',
}));

// GET register
router.get('/register', authGuard.notLogin, authController.getRegister);

// POST register
router.post('/register', authController.postRegister);

// GET logout
router.get('/logout', authController.getLogout);


module.exports = router;