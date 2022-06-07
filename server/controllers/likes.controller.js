const db = require('../services/likes.service');

class LikesController {
    service = db;

    constructor(model) {
        this.db = new this.service(model)
    }

    add = (req, res) => {
        this.db.add(req, res).then((data) => res.status(200).json(data));
    };

    delete = (req, res) => {
        this.db.delete(req, res).then((data) => res.status(200).json(data));
    };
}

module.exports = LikesController;