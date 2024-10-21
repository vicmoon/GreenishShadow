const User = require('../model/userModel');

const registerUserController = async (req, res, next) => {
  const { email, weeklyLetter, gameUpdates } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email is required',
    });
  }

  try {
    const userExisting = await User.findOne({ email });

    if (userExisting) {
      return res.status(400).json({
        status: 'fail',
        message: 'This email is already subscribed',
      });
    }

    const newUser = await User.create({
      email,
      weeklyLetter,
      gameUpdates,
    });

    res.status(201).json({
      status: 'success',
      message: 'You have successfully subscribed to the newsletter!',
      data: { user: newUser },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'There was an error processing your request.',
      error: error.message || error,
    });
  }
};

// Export the controller function
module.exports = { registerUserController };
