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

// to parse the data from req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes

const allowedOrigins = [
  'http://localhost:3000', // for local development
  'https://greenish-shadow-5ceb.vercel.app', // for production
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies
  })
);
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 24 * 60 * 60, // 1 day session expiration
    }),
    cookie: {
      httpOnly: true,
      secure: false, // For development
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      sameSite: 'lax', // Ensure cookies are sent across domains
    },
  })
);

// Save the logged-in user into locals
app.use((req, res, next) => {
  if (req.session.userAuth) {
    res.locals.userAuth = req.session.userAuth;
  } else {
    res.locals.userAuth = null;
  }
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the Greenish Shadow Backend API');
});

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

// module.exports = app;
