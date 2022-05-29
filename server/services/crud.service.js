const { v4: uuidv4 } = require('uuid');

class CRUD_Service {

    /*  constructor(nameDB) {
         this.db = require(`../modules/${nameDB}s`);
         console.log(this.db);
     } */

    getAll = (req, res) => {
        return this.db.findAll({ raw: true }).then(data => data);
    };

    getNewData = (id, req) => {
        let data = { id: id };
        this.tableFields.forEach(item => {
            data[item] = req.body[item];
        })
        return data;
    };

    add = (req, res) => {
        console.log(req.file === undefined); // сделать лоигику добавления файлов 
        console.log(req.file, req.body);
        return (this.db
            .create(this.getNewData(uuidv4(), req))
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
