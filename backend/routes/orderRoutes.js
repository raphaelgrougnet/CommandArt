const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.get('/order', orderController.getOrders)

module.exports = router;