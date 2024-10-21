const express = require('express');
const userRoutes = express.Router();
const { registerUserController } = require('../controller/userController');

//register
userRoutes.post('/register', registerUserController);

module.exports = userRoutes;
