const express = require('express');
const router = express.Router();
const userController = require("../components/user/userController")

/* GET users listing. */



router.get('/profile', userController.getProfile);


router.post('/update_avt/:id', userController.updateImage);

module.exports = router;