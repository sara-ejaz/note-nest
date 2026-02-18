const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// Student & Admin signup
router.post('/signup', signup);

// Login with email or roll number
router.post('/login', login);

module.exports = router;

