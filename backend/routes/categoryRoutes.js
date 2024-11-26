const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();
const isAuth = require('../middleware/is-auth')
const isAdmin = require('../middleware/is-admin')

router.post('/category', isAuth, isAdmin, categoryController.createCategory)

module.exports = router