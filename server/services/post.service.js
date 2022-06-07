const CRUD_Service = require('./crud.service');
const { v4: uuidv4 } = require('uuid');

class PostService extends CRUD_Service {
    tableFields = ['description', 'img', 'date', 'likes'];

    getAll = async () => { // tableFields == не нужен 
        const posts = await this._db.Post.findAll({
            attributes: { exclude: ['userId'] },
            include: [
                { model: this._db.User, as: 'Owner_posts', attributes: ['user_name'] },
                { model: this._db.User, as: 'Users_added_like_to_post', attributes: ['user_name'] }
            ]
        });

        return await posts;
    };

    add = (req, res) => { /// переделать 
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