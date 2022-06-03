
class CRUDController {

    constructor(nameDB) {
        this.db = require(`../services/${nameDB}.service`);
    }

    getAll = (req, res) => {
        this.db.getAll(req).then((data) => res.status(200).json(data));
    };

    add = (req, res) => {
        this.db.add(req, res).then((data) => res.status(200).json(data));
    };

    edit = (req, res) => {
        this.db.edit(req, res).then((data) => res.status(200).json(data));
    };

    getOne = (req, res) => {
        this.db.getOne(req, res).then((data) => res.status(200).json(data));
    };

    delete = (req, res) => {
        this.db.delete(req, res).then((data) => res.status(200).json(data));
    };
}

module.exports = CRUDController;