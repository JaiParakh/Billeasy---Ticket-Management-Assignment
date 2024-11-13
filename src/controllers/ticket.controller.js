const { validationResult } = require('express-validator');
const ticketRepository = require('../repositories/ticket.repository');
const TicketAnalyzer = require('../services/analytics/analyzer');

exports.createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticketData = {
      ...req.body,
      createdBy: req.user._id
    };

    // This ensures due date is in the future.
    if (new Date(ticketData.dueDate) <= new Date()) {
      return res.status(400).json({ message: 'Due date must be in the future' });
    }

    const ticket = await ticketRepository.create(ticketData);
    await ticket.populate('createdBy', 'name email');

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Ticket creation failed' });
  }
};

exports.assignUser = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { userId } = req.body;

    const ticket = await ticketRepository.findById(ticketId);

    // We check for all the given constraints and proceed only if all of them are met.
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.status === 'closed') {
      return res.status(400).json({ message: 'Cannot assign users to a closed ticket' });
    }

    if (ticket.assignedUsers.length >= 5) {
      return res.status(400).json({ message: 'User assignment limit reached' });
    }

    if (ticket.assignedUsers.includes(userId)) {
      return res.status(400).json({ message: 'User already assigned' });
    }

    if (ticket.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    ticket.assignedUsers.push(userId);
    await ticket.save();

    res.json({ message: 'User assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'User assignment failed' });
  }
};

exports.getTicketDetails = async (req, res) => {
  try {
    // We are populating tickets with users
    const ticket = await ticketRepository.findWithUsers(req.params.ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({
      ...ticket.toObject(),
      statistics: {
        totalAssigned: ticket.assignedUsers.length,
        status: ticket.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve ticket details' });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, status, priority, type, venue } = req.query;
    const query = {};

    // Since these filters are optional
    if (startDate) query.createdAt = { $gte: new Date(startDate) };
    if (endDate) query.createdAt = { ...query.createdAt, $lte: new Date(endDate) };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (type) query.type = type;
    if (venue) query.venue = venue;

    const tickets = await ticketRepository.findForAnalytics(query);
    const analyzer = new TicketAnalyzer(tickets);
    const analytics = analyzer.analyzeAll();

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve analytics' });
  }
};