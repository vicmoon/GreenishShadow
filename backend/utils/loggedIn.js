const appError = require("./appError");

const loggedIn = (req, res, next) => {
  if (req.session.userAuth) {
    next();
  } else {
    next(appError("Not authorized"));
  }
};

module.exports = loggedIn;
