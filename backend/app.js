const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./config/mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

// Enable CORS for all routes

app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  })
);
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      client: mongoose.connection.getClient(), // Using MongoDB to store sessions
      ttl: 24 * 60 * 60, // 1 day session expiration
    }),
  })
);

// Make sure session middleware is applied **before** your routes
app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);

// Wildcard route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
