const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const appError = require('../utils/appError');

// Register User
const registerUserController = async (req, res, next) => {
  // console.log(req.session);
  const { fullname, email, password } = req.body;
  console.log(req.body);

  //check if field is empty
  if (!fullname || !email || !password) {
    return res.render('users/register', {
      error: '⚠️ All fields are required ⚠️',
    });
  }
  try {
    // Check if user exists
    const userExisting = await User.findOne({ email });

    if (userExisting) {
      return res.render('users/register', {
        error: '⚠️ User already exists ⚠️',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10); // Await the salt generation
    const passwordHashed = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Create the user
    const newUser = await User.create({
      fullname,
      email,
      password: passwordHashed,
    });

    // redirect the user instead of the confirmation
    res.redirect('/posts');
    console.log(newUser);
    // res.json({
    //   status: "Success",
    //   data: newUser,
    // });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
    res.json(error);
  }
};

//Log in user
const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If no user is found or password is incorrect
    if (!user || !(await user.comparePassword(password))) {
      return next(appError('Invalid email or password', 401));
    }

    // Store the user ID in the session after successful login
    req.session.userAuth = user._id; // Save the user ID in the session

    // Send a success response or redirect the user
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    return next(appError('An error occurred during login', 500));
  }
};

// Logout
const logoutUserController = async (req, res) => {
  // destroy session
  req.session.destroy(() => {
    res.redirect('/posts');
  });
};

module.exports = {
  registerUserController,
  loginController,
  logoutUserController,
};
