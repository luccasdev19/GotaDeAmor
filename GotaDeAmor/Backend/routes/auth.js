const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

// POST - Login
router.post('/login', login); // POST /api/auth/login

module.exports = router;
