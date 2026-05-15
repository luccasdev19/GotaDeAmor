const express = require('express');
const { login, logout } = require('../controllers/authController');
const { loginLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST - Login com proteção contra brute force
router.post('/login', loginLimiter, login); // POST /api/auth/login

// POST - Logout
router.post('/logout', logout); // POST /api/auth/logout

module.exports = router;
