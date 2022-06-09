const CRUD_Service = require('./crud.service');
const { v4: uuidv4 } = require('uuid');

class PostService extends CRUD_Service {
    tableFields = ['description', 'img', 'date', 'likes'];

    getAll = async (req) => { // tableFields == не нужен 
        const params = {
            attributes: { exclude: ['userId'] },
            include: [
                { model: this._db.User, as: 'Owner_posts', attributes: ['user_name'] },
                { model: this._db.User, as: 'Users_added_like_to_post', attributes: ['user_name'] }
            ],
            order: [['date', 'DESC']]
        }
        req.query.id ? params['where'] = { userId: req.query.id } : null;
        const posts = await this._db.Post.findAll(params).then(posts => {
            return posts.map(item => {
                return ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    img: item.img,
                    Owner_posts: item.Owner_posts,
                    Users_added_like_to_post: item.Users_added_like_to_post,
                    date: (new Date(item.date).toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" }))
                })
            })
        })

        return await posts;
    };


    delete = (req) => {
        return this._db.Post.destroy({ where: { id: req.params.id } }
        ).then(async () => {
            await this._db.Comment.destroy({ where: { postId: req.params.id } });
            return await req.params.id;
        }).catch(err => err);
    }

    add = (req, res) => {
        const post = {
            id: uuidv4(),
            ...req.body,
            img: req.file.filename,
            date: new Date()
        }
        return (this._db.Post.create(post)
            .then(data => {
                return ({
                    id: data.id,
                    title: data.title,
                    userId: data.userId,
                    description: data.description,
                    img: data.img,
                    data: (new Date(data.date).toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" }))
                })

            }).catch(err => console.log(err)))
    }

    edit = (req, res) => {
        //удалить файл старый
        const post = { ...req.body };
        req.file ? post['img'] = req.file.filename : null
        return (
            this._db.Post.update({ ...post }, { where: { id: req.params.id } }
            ).then(() => post)


        )
    }
}

module.exports = new PostService();

