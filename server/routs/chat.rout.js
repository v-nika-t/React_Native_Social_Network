const path = require('path');
const controller = require(path.resolve(__dirname, "../controllers", "chat.controller.js"));
const express = require('express');
const route = express.Router();

route
    .post("/creat", controller.creatChat)
module.exports = route; 