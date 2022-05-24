const path = require('path');
const controller = require(path.resolve(__dirname, "../controllers", "api.user.controller.js"));
const express = require('express');
const route = express.Router();
route
    .get("/api/users", controller.getAllUsers) 
    .get("/api/user/:id", controller.getEditUser)
    .post('/api/add-user', controller.addUser) 
    
    .put("/api/edit/:id", controller.editUser)
    .delete("/api/delete-user/:id", controller.deleteUser)
    

module.exports = route; 
