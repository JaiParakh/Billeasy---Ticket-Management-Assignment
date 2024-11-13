const { body } = require('express-validator');

// COmpiled all the validation logic here
const validations = {
  email: body('email').isEmail().withMessage('Must be a valid email'),
  password: body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
  name: body('name').trim().notEmpty().withMessage('Name is required'),
  title: body('title').trim().notEmpty().withMessage('Title is required'),
  description: body('description').trim().notEmpty().withMessage('Description is required'),
  type: body('type')
    .isIn(['concert', 'conference', 'sports'])
    .withMessage('Type must be concert, conference, or sports'),
  venue: body('venue').trim().notEmpty().withMessage('Venue is required'),
  priority: body('priority')
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  dueDate: body('dueDate')
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date'),
  userId: body('userId').isMongoId().withMessage('Must be a valid user ID')
};

// With the above validation logic, we can use this middleware everywhere
exports.validate = (fields) => {
  const validationArray = fields.map(field => {
    if (validations[field]) {
      return validations[field];
    }
    throw new Error(`Validation for field '${field}' not found`);
  });
  
  return validationArray;
};