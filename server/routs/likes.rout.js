const path = require('path');
const LikesController = require(path.resolve(__dirname, "../controllers", "likes.controller.js"));

const route = (nameDB) => {

    const controller = new LikesController(nameDB);
    const express = require('express');
    const route = express.Router();

    route
        .post("/add", controller.add)
        .delete("/delete", controller.delete)
    return route;
}

module.exports = route;  