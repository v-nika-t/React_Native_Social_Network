const path = require('path');
const controller = require(path.resolve(__dirname, "../controllers", "auth.controller.js"));
const express = require('express');
const route = express.Router();

route
    .post("/signUp", controller.signUp)
    .post("/signIn", controller.signIn)

module.exports = route; 