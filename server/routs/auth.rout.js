const path = require('path');
const controller = require(path.resolve(__dirname, "../controllers", "api.auth.controller.js"));
const express = require('express');
const route = express.Router();
const auth = require("../middleware/auth");

route
    .use(auth)
    .post("/signUp", controller.signUp)
    .post("/signIn", controller.signIn)

module.exports = route; 