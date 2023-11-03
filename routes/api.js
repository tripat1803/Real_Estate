const express = require("express");
const api = express.Router();
const signinRouter = require("./signin-out/signin.router");
const signupRouter = require("./signup/signup.router");
const forgetRouter = require("./forget/forget.router");
const signoutRouter = require("./signin-out/signout.router");

api.use("/signin", signinRouter);
api.use("/signout", signoutRouter);
api.use("/signup", signupRouter);
api.use("/forget-password", forgetRouter);

module.exports = api;