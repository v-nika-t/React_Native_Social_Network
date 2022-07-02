const express = require('express');
const multer = require('multer');
const storage = require('../storage/storage');

const likesRoutes = require('../routs/likes.rout.js');
const crudRoutes = require('./crud.rout.js');

const upload = multer({ storage: storage });
const route = express.Router();

route
    .use('/', upload.single('img'), crudRoutes('post'))
    .use('/likes', likesRoutes('LikeofPost'));

module.exports = route;


