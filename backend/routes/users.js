const express = require('express');
const userRoutes = express.Router();
const {
  registerUserController,
  loginController,
  logoutUserController,
} = require('../controller/userController');

//register
userRoutes.post('/register', registerUserController);

// POST/api/v1/users/login
userRoutes.post('/login', loginController);

//GET/api/v1/users/logout/:id
userRoutes.get('/logout', logoutUserController);

module.exports = userRoutes;
