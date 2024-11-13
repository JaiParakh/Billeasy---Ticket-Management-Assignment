const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const database = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const ticketRoutes = require('./routes/ticket.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tickets', ticketRoutes);

// Error handling
app.use(errorHandler);

// Initialize database connection
database.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});