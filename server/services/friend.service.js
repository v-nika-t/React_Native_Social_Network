const { v4: uuidv4 } = require('uuid');
const DB = require('../modules/index');

class FriendService {
    DB_FRIEND = DB.Friend;

    edit = async (body, where) => {
        return await this.DB_FRIEND.update({ ...body }, { where: where }).then(() => 'done').catch(err => err)
    };

    add = async (body) => {
        return this.DB_FRIEND.create({ id: uuidv4(), ...body }).then(data => data).catch(e => console.log(e));
    }

    delete = (where) => {
        return this.DB_FRIEND.destroy({ where: where }
        ).then(() => 'done').catch(err => err);
    }
    getAll = (req, res) => {
        return this.DB_FRIEND.findAll();
    }

}

module.exports = new FriendService();