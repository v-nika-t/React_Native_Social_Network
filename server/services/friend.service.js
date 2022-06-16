const { v4: uuidv4 } = require('uuid');
const { Friend } = require('../modules');
const CRUD_Service = require('./crud.service');

class FriendService extends CRUD_Service {

    edit = async (body, where) => {
        return await this._db.Friend.update({ ...body }, { where: where }).then(() => 'done').catch(err => err)
    };


    add = async (body) => {
        return this._db.Friend.create({ id: uuidv4(), ...body }).then(data => data).catch(e => console.log(e));

    }

    delete = (where) => {
        return this._db.Friend.destroy({ where: where }
        ).then(() => 'done').catch(err => err);
    }

    getAll = (req, res) => {
        return this._db.Friend.findAll();
    }

}

module.exports = new FriendService();