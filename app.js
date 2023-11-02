const express = require("express");
const port = process.env.PORT || 8000;
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const signinRouter = require("./routes/signin.router");
const signupRouter = require("./routes/signup.router");
const forgetRouter = require("./routes/forget.router");
const app = express();
const api = express.Router();
require("dotenv").config();

app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/forget-password", forgetRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, async () => {
  await mongoConnect();
  console.log(`Server is running on port ${port}`);
});
