const express = require('express');

const likesRoutes = require('../routs/likes.rout.js');
const crudRoutes = require('./crud.rout.js');

const route = express.Router();

route
    .use('/', crudRoutes('comment'))
    .use('/likes', likesRoutes('LikeofComment'));

module.exports = route;

