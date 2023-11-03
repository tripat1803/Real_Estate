const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const api = require('../routes/api')


app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/",api);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
