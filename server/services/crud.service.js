const { v4: uuidv4 } = require('uuid');

class CRUD_Service {

    tableFields = "";
    _db = require('../modules/index');

    getAll = () => {
        return this.db.findAll({ raw: true }).then(data => data);
    };

    getObjectDataforDB = (id, req) => {
        let data = { id: id };
        this.tableFields.forEach(item => {
            data[item] = req.body[item];
        })
        return data;
    };

    add = (req, res) => {
        return (this.db
            .create(this.getObjectDataforDB(uuidv4(), req))
            .then(data => data))
            .catch(err => console.log(err))
    };

    edit = (req, res) => {
        const newData = this.getNewData(req.params.id, req);
        return (this.db
            .update(this.getNewData(req.params.id, req), {
                where: {
                    id: newData['id']
                },
            }
            ).then(() => newData)
        )
    }

    getOne = (req, res) => {
        return this.db
            .findAll({ where: { id: req.params.id }, raw: true })
            .then((data) => data);
    };

    delete = (req, res) => {
        return this.db
            .destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => req.params.id);
    };
}


module.exports = CRUD_Service;
