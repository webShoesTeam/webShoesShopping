const express = require('express');
const router = express.Router();
const billController = require('./billController');




router.get('/detail/:id', billController.getBillWithIdBill);
router.get('/history', billController.getBillWithUserId);



module.exports = router;

