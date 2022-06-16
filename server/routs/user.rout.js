const path = require('path');
const express = require('express');

const controller = require(path.resolve(__dirname, "../controllers", "friend.controller.js"));
const crudRoutes = require('./crud.rout.js');

const route = express.Router();

route
    .use('/', crudRoutes('user'))
    .post("/add/friend", controller.addFriend)
    .delete("/delete/friend/:id", controller.deleteFriend)
    .post("/add/requestInFriend", controller.addRequestInFriend)
    .delete("/delete/requestInFriend/:id", controller.deleteRequestInFriend)

module.exports = route;

