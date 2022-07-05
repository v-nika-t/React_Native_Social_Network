const db = require('../modules/index');

class LikeService {
    _db = db;

    constructor(model) {
        this._db = this._db[model];
    }

    add = (req, res) => {
        return this._db.create(req.body).then(data => data).catch(err => err)
    };

    delete = (req, res) => {
        return this._db
            .destroy({
                where: { ...req.body }
            }).then(() => req.params.id);
    };
}

module.exports = LikeService