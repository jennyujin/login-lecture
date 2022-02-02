"use strict";

// Module
const express = require("express");
const app = express();

// Routing
const home = require("../routes/home");

// App Setting
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home); // use -> 미들 웨어를 등록해주는 방법 

module.exports = app;


