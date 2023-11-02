const express = require('express');
const signin = require('../controllers/signin.controller');

const signinRouter = express.Router();

signinRouter.post('/', signin)


module.exports = signinRouter;