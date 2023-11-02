const express = require('express');
const forget = require('../controllers/forget.controller');

const forgetRouter = express.Router();

forgetRouter.post('/', forget);

module.exports = forgetRouter;