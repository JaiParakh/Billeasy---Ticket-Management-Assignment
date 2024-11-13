const express = require('express');
const ticketController = require('../controllers/ticket.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

router.use(authenticate);

router.post('/', validate([
  'title',
  'description',
  'type',
  'venue',
  'priority',
  'dueDate'
]), ticketController.createTicket);

router.post('/:ticketId/assign', validate(['userId']), ticketController.assignUser);

router.get('/:ticketId', ticketController.getTicketDetails);
router.get('/analytics', ticketController.getAnalytics);

module.exports = router;