const { validationResult } = require('express-validator');
const User = require('../models/user.model');

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'User creation failed' });
  }
};