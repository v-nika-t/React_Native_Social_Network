const CRUD_Service = require('./crud.service');

class UserService extends CRUD_Service {
    tableFields = ['name', 'mail', 'password'];


    getUserByEmail = (req, res) => {
        return this.db
            .findAll({ where: { mail: req.body.mail }, raw: true })
            .then((data) => data);
    };
}


module.exports = new UserService();

