const CRUD_Service = require('./crud.service');

class CommentService extends CRUD_Service {
    tableFields = ['description', 'date'];
    db = require('../modules/comments');

}


module.exports = new CommentService();


