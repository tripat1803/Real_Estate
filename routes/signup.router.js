const express = require('express');
const signup = require('../controllers/signup.controller');

const signupRouter = express.Router();

signupRouter.post('/', signup)

module.exports = signupRouter;