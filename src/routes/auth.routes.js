const express = require('express');
const authController = require('../controllers/auth.controller');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

router.post('/login', validate(['email', 'password']), authController.login);

module.exports = router;