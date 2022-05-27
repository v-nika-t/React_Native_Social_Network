const CRUD_Service = require('./crud.service');

class PostService extends CRUD_Service {
    tableFields = ['description', 'img', 'date', 'likes'];
    db = require('../modules/posts');

}


module.exports = new PostService();

