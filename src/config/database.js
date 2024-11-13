const mongoose = require('mongoose');

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ticket-system');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}

module.exports = new Database();