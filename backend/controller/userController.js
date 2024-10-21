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
    res.redirect('/');
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
  }
};

//Log in user
const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If no user is found
    if (!user) {
      return next(appError('Invalid email or password', 401)); // Handle user not found case
    }

    // If the user exists, compare the password
    console.log('Comparing password:', password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return next(appError('Invalid email or password', 401)); // Handle incorrect password case
    }

    // Store the user ID in the session after successful login
    req.session.userAuth = user._id; // Save the user ID in the session
    req.session.save((err) => {
      if (err) console.error('Session save error:', err);
      res.status(200).json({ message: 'Login successful', user });
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return next(appError('An error occurred during login', 500));
  }
};

// Logout
const logoutUserController = async (req, res, next) => {
  // destroy session
  req.session.destroy((err) => {
    if (err) {
      // If there's an error destroying the session, handle it properly
      return next(appError('Error occurred during logout', 500));
    }

    // Clear the session cookie as an extra step
    res.clearCookie('connect.sid', { path: '/' });

    // Redirect the user after the session is destroyed
    res.status(200).json({ message: 'Login successful', user });
  });
};

module.exports = {
  registerUserController,
  loginController,
  logoutUserController,
};
