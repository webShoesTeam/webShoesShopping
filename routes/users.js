const express = require('express');
const router = express.Router();
const userController = require("../components/user/userController")
const authGuard = require('../middlewares/authGuard');
/* GET users listing. */



router.get('/profile', authGuard.hasLogin, userController.getProfile);

// Duc: to-do here
// router.post('/change', authGuard.hasLogin, userController.changePassword);

router.post('/update_avt/:id', authGuard.hasLogin, userController.updateImage);

router.post('/save/:id', authGuard.hasLogin, userController.saveUpdate);
router.post('/updatePassword/:id', authGuard.hasLogin, userController.updatePassword);


module.exports = router;