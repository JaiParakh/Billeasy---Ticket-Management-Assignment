const BaseRepository = require('./base.repository');
const Ticket = require('../models/ticket.model');

class TicketRepository extends BaseRepository {
  constructor() {
    super(Ticket);
  }

  async findWithUsers(id) {
    return this.model.findById(id)
      .populate('createdBy', 'name email')
      .populate('assignedUsers', 'name email');
  }

  async findForAnalytics(query) {
    return this.model.find(query)
      .populate('createdBy', 'name email')
      .sort('-createdAt');
  }
}

module.exports = new TicketRepository();