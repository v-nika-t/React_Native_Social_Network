const { User } = require('../modules');
const CRUD_Service = require('./crud.service');

class UserService extends CRUD_Service {
    tableFields = ['name', 'mail', 'password'];

    getAll = (req) => {
        if (!req.query.id) {
            return this._db.User.findAll({
                include: {
                    model: User,
                    as: 'subscriber',
                    attributes: ['id']
                },
                attributes: ['user_name', 'id']

            }).then(data => data);
        } else {
            return this._db.Friend.findAll({
                attributes: ['status'],
                where: { userId: 1 },
                include: {
                    model: this._db.User,
                    attributes: ['user_name'],
                }
            }).then(data => data);
        }
    };

    getUserByEmail = (req, res) => {
        return this.db
            .findAll({ where: { mail: req.body.mail }, raw: true })
            .then((data) => data);
    };
}


module.exports = new UserService();

