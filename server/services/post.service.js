const CRUD_Service = require('./crud.service');
const { v4: uuidv4 } = require('uuid');

class PostService extends CRUD_Service {
    tableFields = ['description', 'img', 'date', 'likes'];

    getAll = () => { // tableFields == не нужен 
        return this._db.Post.findAll({
            attributes: { exclude: ['userId'] },
            include: {
                model: this._db.User,
                attributes: ['user_name']

            }
        }).then(data => data);
    };

    add = (req, res) => {
        let dataforDB = this.getObjectDataforDB(uuidv4(), req);
        dataforDB['img'] = req.file.path;
        return (this.db
            .create(dataforDB)
            .then(data => data))
            .catch(err => console.log(err)
            )
    }
}


module.exports = new PostService();

1