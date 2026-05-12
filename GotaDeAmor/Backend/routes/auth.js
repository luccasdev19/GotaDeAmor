const express = require('express');
const { login } = require('../controllers/authController');
const { loginLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// POST - Login com proteção contra brute force
router.post('/login', loginLimiter, login); // POST /api/auth/login

module.exports = router;
