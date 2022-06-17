const { v4: uuidv4 } = require('uuid');
const { User } = require('../modules');
const CRUD_Service = require('./crud.service');

class UserService extends CRUD_Service {
    tableFields = ['name', 'mail', 'password'];

    getAll = async (req) => {

        if (req.query.id) {
            const requestInFriend = await this._db.User.findAll({
                attributes: [],
                where: { id: req.query.id },
                include: {
                    model: User,
                    as: 'subscriber',
                    attributes: ['user_name', 'id'],
                },
            });

            const friend = await this._db.Friend.findAll({
                attributes: ['status'],
                where: { userId: req.query.id, status: true },
                include: [{
                    model: this._db.User,
                    attributes: ['user_name', 'id'],
                }
                ]
            });

            const subscriber = await this._db.Friend.findAll({
                attributes: ['status'],
                where: { userId: req.query.id, status: false },
                include: [{
                    model: this._db.User,
                    attributes: ['user_name', 'id'],
                }
                ]
            });

            return {
                requestInFriend,
                friend,
                subscriber
            }
        } else {
            return this._db.User.findAll({
                attributes: ['user_name', 'id']
            }).then(data => data);
        }

    };

    edit = (req, res) => {
        const comment = { ...req.body };
        return this._db.User.update({ ...comment }, { where: { id: req.params.id } }).then(() => comment)

    };

    getAllWhere = (where) => {
        return this._db.User
            .findAll({ where })
            .then((data) => data);
    };

    add = (body) => {
        return (this._db.User.create({ ...body, id: uuidv4() })
            .then(data => data)
            .catch(err => console.log(err)))
    }


}


module.exports = new UserService();

