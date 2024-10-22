const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoStore = require('connect-mongo');
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

// Test route to check backend status
app.get('/test', (req, res) => {
  res.send('Backend is working');
});

// Routes
app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);

// Remove frontend static serving (if frontend is deployed separately)

// Export the app for Vercel
module.exports = app;
