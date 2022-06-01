const path = require('path');
const CRUDController = require(path.resolve(__dirname, "../controllers", "crud.controller.js"));

const route = (nameDB) => {

    const controller = new CRUDController(nameDB);
    const express = require('express');
    const route = express.Router();

    route
        .get("/all", controller.getAll)
        .get("/get/:id", controller.getOne)
        .post("/add", controller.add)
        .put("/edit/:id", controller.edit)
        .delete("/delete/:id", controller.delete)
    return route;
}

module.exports = route;  