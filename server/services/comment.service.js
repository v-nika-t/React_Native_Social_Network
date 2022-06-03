const CRUD_Service = require('./crud.service');

class CommentService extends CRUD_Service {
    tableFields = ['description', 'date'];

    getAll = (req) => {
        if (!req.query.id) {
            return this._db.Comment.findAll({ raw: true }).then(data => data);
        } else {
            return this._db.Comment.findAll({
                where: { postId: req.query.id },
                attributes: { exclude: ['userId'] },
                include: {
                    model: this._db.User,
                    attributes: ['user_name']

                },
            }).then(data => data);
        }
    };


}


module.exports = new CommentService();


