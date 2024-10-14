const express = require("express");
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts");

const app = express();

// register middleware

app.use(postsRoutes);

app.listen(5000);
