const { v4: uuidv4 } = require('uuid');
const { User } = require('../modules');
const CRUD_Service = require('./crud.service');
const bcrypt = require('bcrypt');

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
                include: {
                    model: this._db.Role,
                    attributes: ['name'],

                }
            }).then(data => data);
        }

    };

    getOne = (req, res) => {
        return this._db.User
            .findAll({
                where: { id: req.params.id }, raw: false,
                include: {
                    model: this._db.Role,
                    attributes: ['name'],

                }

            })
            .then((data) => data);
    };


    getAllWhere = (where) => {
        return this._db.User.findAll({
            where, raw: true,
            include: {
                model: this._db.Role,
                attributes: ['name'],
            }
        }).then(data => data);
    };

    edit = async (req, res) => {
        if (req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash
        }
        return this._db.User.update({ ...req.body }, { where: { id: req.params.id } }).then(() => 'done')
    };

    add = async (req, res) => {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await this._db.User.create({ ...req.body, id: uuidv4(), password: hash });
        return this._db.User.findAll({
            where: { id: user.id }, raw: false,
            include: {
                model: this._db.Role,
                attributes: ['name'],

            }
        }).then(data => data)
            .catch(err => console.log(err))

    }

    delete = (req) => {
        return this._db.User.destroy({ where: { id: req.params.id } }
        ).then(() => req.params.id).catch(err => err);
    }

    1
}


module.exports = new UserService();

