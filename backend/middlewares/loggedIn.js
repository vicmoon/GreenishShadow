const loggedIn = (req, res, next) => {
  if (req.session && req.session.userAuth) {
    console.log('Session during request:', req.session);

    next(); // User is logged in, proceed to the next middleware/controller
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'You must be logged in to perform this action',
    });
  }
};

module.exports = loggedIn;
