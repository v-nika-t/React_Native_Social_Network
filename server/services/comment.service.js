const { v4: uuidv4 } = require('uuid');
const CRUD_Service = require('./crud.service');

class CommentService extends CRUD_Service {
    tableFields = ['description', 'date'];

    getAll = (req) => { //  tableFields  == НЕ надо
        if (!req.query.id) {
            return this._db.Comment.findAll({ raw: true }).then(data => data);
        } else {
            return this._db.Comment.findAll({
                where: { postId: req.query.id },
                attributes: { exclude: ['userId'] },
                include: [{
                    model: this._db.User,
                    as: 'Owner_comments',
                    attributes: ['user_name', 'id'],
                },
                { model: this._db.User, as: 'Users_added_like_to_comment', attributes: ['user_name'] }
                ],
            }).then(data => data);
        }
    };

    add = async (req, res) => {//  tableFields  == НЕ надо

        const comment = await this._db.Comment.create({ id: uuidv4(), ...req.body });
        const user = await comment.getOwner_comments();

        return await ({
            id: comment.id,
            description: comment.description,
            date: comment.date,
            postId: comment.postId,
            Owner_comments: { user_name: user.user_name },
            Users_added_like_to_comment: []
        })

    };
}
module.exports = new CommentService();


