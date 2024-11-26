const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const isAuth = require('../middleware/is-auth')

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/checkEmailExists', authController.checkEmailExists);
router.get('/currentUser', isAuth, authController.getUser);
module.exports = router;
