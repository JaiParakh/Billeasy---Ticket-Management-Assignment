const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['concert', 'conference', 'sports']
  },
  venue: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['open', 'in-progress', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  dueDate: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);