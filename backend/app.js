const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
require('dotenv').config();
require('./config/mongoose');

const app = express();

// Enable CORS for all routes
// Enable CORS to allow requests from your frontend
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  })
);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Register API middleware and routes
app.use(express.json());
app.use(bodyParser.json());

// Make sure your API routes are registered **before** the wildcard route
app.use('/api', postsRoutes); // API routes are prefixed with /api
app.use('/api/users', userRoutes);

// Wildcard route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_KEY, // Make sure the secret is set in your .env
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    store: mongoStore.create({
      client: mongoose.connection.getClient(), // Use the MongoDB client for session storage
      ttl: 24 * 60 * 60, // Session expiration time
    }),
  })
);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
