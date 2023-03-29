const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const blogRoute = require("./routes/blog");

//Router MIddlewares
app.use(express.json());
app.use("/", blogRoute);
module.exports = app;
