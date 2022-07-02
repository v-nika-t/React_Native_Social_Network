const { v4: uuidv4 } = require('uuid');
const DB = require('../modules/index');
const bcrypt = require('bcrypt');

class UserService {

    DB_FRIEND = DB.Friend;
    DB_USER = DB.User;
    DB_ROLE = DB.Role;

    getAll = async (req) => {
        if (req.query.id) {
            const requestInFriend = await this.DB_USER.findAll({
                attributes: [],
                where: { id: req.query.id },
                include: {
                    model: this.DB_USER,
                    as: 'subscriber',
                    attributes: ['user_name', 'id'],
                },
            });

            const friend = await this.DB_FRIEND.findAll({
                attributes: ['status'],
                where: { userId: req.query.id, status: true },
                include: [{
                    model: this.DB_USER,
                    attributes: ['user_name', 'id'],
                }
                ]
            });

            const subscriber = await this.DB_FRIEND.findAll({
                attributes: ['status'],
                where: { userId: req.query.id, status: false },
                include: [{
                    model: this.DB_USER,
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
            return this.DB_USER.findAll({
                include: {
                    model: this.DB_ROLE,
                    attributes: ['name'],

                }
            }).then(data => data).catch(err => { throw err });
        }

    };

    getOne = (req, res) => {
        return this.DB_USER
            .findAll({
                where: { id: req.params.id }, raw: false,
                include: {
                    model: this.DB_ROLE,
                    attributes: ['name'],

                }
            })
            .then((data) => data).catch(err => { throw err });
    };


    getAllWhere = (where) => {
        return this.DB_USER.findAll({
            where, raw: true,
            include: {
                model: this.DB_ROLE,
                attributes: ['name'],
            }
        }).then(data => data).catch(err => { throw err })
    };

    edit = async (req, res) => {
        if (req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash
        }
        return this.DB_USER.update({ ...req.body }, { where: { id: req.params.id } }).then(() => 'done').catch(err => { throw err })
    };

    add = async (req, res) => {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await this.DB_USER.create({ ...req.body, id: uuidv4(), password: hash });
        return this.DB_USER.findAll({
            where: { id: user.id }, raw: false,
            include: {
                model: this.DB_ROLE,
                attributes: ['name'],

            }
        }).then(data => data).catch(err => { throw err })
    }

    delete = (req) => {
        return this.DB_USER.destroy({ where: { id: req.params.id } }
        ).then(() => req.params.id).catch(err => { throw err });
    }


}


module.exports = new UserService();

