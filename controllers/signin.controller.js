const user = require("../models/user.mongo.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function signin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Please fill all the login fields" });
    }
    const userCheck = await user.findOne({ email: email });

    if (userCheck && (await bcrypt.compare(password, userCheck.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(422).json({ error: "Invalid Email or Password" });
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = signin;
