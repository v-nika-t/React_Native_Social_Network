const CRUDController = require("./crud.controller");
const DB_POST = require('../services/post.service');

class UserController extends CRUDController {
    db_post = DB_POST;

    constructor(nameDB) {
        super(nameDB)
    }

    delete = (req, res) => {
        console.log(req.body)
        this.db.delete(req, res).then((data) => res.status(200).json(data));
    };
}

module.exports = new UserController('user');