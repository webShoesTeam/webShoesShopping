const express = require('express');
const router = express.Router();
const billController = require('./billController');




router.get('/:id', billController.getBillWithIdBill);
router.get('/history/:id', billController.getBillWithUserId);



module.exports = router;

