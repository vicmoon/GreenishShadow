const path = require("path");
const express = require("express");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts");
require("dotenv").config();
require("./config/mongoose");

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Register API middleware and routes
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", postsRoutes); // API routes

// Anything that doesn't match the API routes should render the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// session config
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      client: mongoose.connection.getClient(),
      ttl: 24 * 60 * 60,
    }),
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
