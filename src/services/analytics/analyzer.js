/**
 * Analytics Service
 * Handles ticket analytics calculations
 */
class TicketAnalyzer {
  constructor(tickets) {
    this.tickets = tickets;
  }

  analyzeAll() {
    return {
      ...this.getStatusAnalytics(),
      ...this.getDistributionAnalytics(),
      tickets: this.getTicketsSummary()
    };
  }

  getStatusAnalytics() {
    return {
      totalTickets: this.tickets.length,
      closedTickets: this.tickets.filter(t => t.status === 'closed').length,
      openTickets: this.tickets.filter(t => t.status === 'open').length,
      inProgressTickets: this.tickets.filter(t => t.status === 'in-progress').length
    };
  }

  getDistributionAnalytics() {
    return {
      priorityDistribution: {
        low: this.tickets.filter(t => t.priority === 'low').length,
        medium: this.tickets.filter(t => t.priority === 'medium').length,
        high: this.tickets.filter(t => t.priority === 'high').length
      },
      typeDistribution: {
        concert: this.tickets.filter(t => t.type === 'concert').length,
        conference: this.tickets.filter(t => t.type === 'conference').length,
        sports: this.tickets.filter(t => t.type === 'sports').length
      }
    };
  }

  getTicketsSummary() {
    return this.tickets.map(ticket => ({
      id: ticket._id,
      title: ticket.title,
      status: ticket.status,
      priority: ticket.priority,
      type: ticket.type,
      venue: ticket.venue,
      createdDate: ticket.createdAt,
      createdBy: ticket.createdBy._id
    }));
  }
}

module.exports = TicketAnalyzer;