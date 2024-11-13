const express = require('express');
const userController = require('../controllers/user.controller');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

router.post('/', validate(['name', 'email', 'password']), userController.createUser);

module.exports = router;