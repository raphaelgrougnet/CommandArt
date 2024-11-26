const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();
const isAuth = require('../middleware/is-auth')
const isAdmin = require('../middleware/is-admin')

router.get('/category', isAuth, categoryController.getCategories)
router.post('/category', isAuth, isAdmin, categoryController.createCategory)
router.delete('/category/:id', isAuth, isAdmin, categoryController.deleteCategory)

module.exports = router