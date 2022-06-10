const { v4: uuidv4 } = require('uuid');
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
                    attributes: ['user_name', 'id'],
                }
            }).then(data => data);
        }
    };

    edit = (req, res) => {
        const comment = { ...req.body };
        return this._db.User.update({ ...comment }, { where: { id: req.params.id } }).then(() => comment)

    };

    /* getUserByEmail = (req, res) => {
        return this.db
            .findAll({ where: { mail: req.body.mail }, raw: true })
            .then((data) => data);
    }; */



    addFriend = async (req, res) => {
        const userId = 2;
        const friendId = 5;
        const body = { status: false } // из рек или контроллера

        const friend_1 = await this._db.Friend.findOne({ where: { userId, friendId } });
        const friend_2 = await this._db.Friend.findOne({ where: { userId: friendId, friendId: userId } });
        const friend = friend_1 ? friend_1 : friend_2

        const result = friend ? friend.update({ ...body }) : this._db.Friend.create({ id: uuidv4(), userId, friendId, status: false });
        return (await result);

    }


}


module.exports = new UserService();

