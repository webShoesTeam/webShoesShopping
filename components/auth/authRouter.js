const express = require('express');
const router = express.Router();
const authController = require("./authController");
const passport = require('../../passport');
const authGuard = require('../../middlewares/authGuard');

router.get('/login', authGuard.notLogin, authController.login);

// POST login
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login?wrong-password',
// }));

router.post('/login', authController.postLogin);

// GET register
router.get('/register', authGuard.notLogin, authController.getRegister);

// POST register
router.post('/register', authController.postRegister);
router.get('/activation/:token', authController.activateEmail);

// GET logout
router.get('/logout', authController.getLogout);

router.get('/forget', authGuard.notLogin, authController.forget);
router.post('/forget', authGuard.notLogin, authController.postForget);
router.get('/reset/:token', authController.resetPassword);

router.get('/changePassword/:id', authController.changePassword);
router.post('/changePassword/:id', authController.change);


module.exports = router;