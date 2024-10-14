const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("Get response from posts");
  res.json({
    message: "It works",
  });
});

module.exports = router;
