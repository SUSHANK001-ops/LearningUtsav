const express = require('express');
const router = express.Router();
const { RegisterUser, LoginUser, GetCurrentUser, LogoutUser } = require('../controllers/authController');

router.post('/auth/register', RegisterUser);
router.post('/auth/login', LoginUser);
router.post('/auth/logout', LogoutUser);
router.get('/auth/me', GetCurrentUser);

module.exports = router;
