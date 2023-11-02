const user = require("../models/user.mongo.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function signup(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body);
    if (!name || !email || !password || !confirmPassword) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    const userExist = await user.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != confirmPassword) {
      return res
        .status(422)
        .json({ error: "Password and Confirm Password are not matching" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const encryptedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    const newUser = new user({
      name,
      email,
      password: encryptedPassword,
      confirmPassword: encryptedConfirmPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    newUser.token = token;

    // return new user
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
  }
}

module.exports = signup;
