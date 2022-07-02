const { v4: uuidv4 } = require('uuid');
const DB = require('../modules/index');
1
class CommentService {
    DB_СOMMENT = DB.Comment;
    DB_USER = DB.User;

    getAll = async (req) => {
        const params = {
            attributes: { exclude: ['userId'] },
            order: [['date', 'DESC']],
            include: [{
                model: this.DB_USER,
                as: 'Owner_comments',
                attributes: ['user_name', 'id'],
            },
            { model: this.DB_USER, as: 'Users_added_like_to_comment', attributes: ['user_name'] }
            ],
        }

        req.query.id ? params['where'] = { postId: req.query.id } : null;

        const comments = await this.DB_СOMMENT.findAll(params).then(comments => {
            return comments.map(item => {
                return ({
                    id: item.id,
                    description: item.description,
                    postId: item.postId,
                    Owner_comments: item.Owner_comments,
                    Users_added_like_to_comment: item.Users_added_like_to_comment,
                    date: (new Date(item.date).toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" }))
                })
            })
        });

        return await comments;
    };

    add = async (req, res) => {
        const comment = await this.DB_СOMMENT.create({ id: uuidv4(), ...req.body, date: new Date() });
        const user = await comment.getOwner_comments();

        return ({
            id: comment.id,
            description: comment.description,
            date: (new Date(comment.date).toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" })),
            postId: comment.postId,
            Owner_comments: { user_name: user.user_name },
            Users_added_like_to_comment: []
        })
    };

    delete = (req) => {
        return this.DB_СOMMENT.destroy({ where: { id: req.params.id } }
        ).then(async () => req.params.id).catch(err => err);
    }

    edit = (req, res) => {
        const comment = { ...req.body };
        return this.DB_СOMMENTt.update({ ...comment }, { where: { id: req.params.id } }).then(() => comment)

    }
}
module.exports = new CommentService();


