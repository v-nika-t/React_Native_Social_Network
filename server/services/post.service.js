const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const DB = require('../modules/index');

class PostService {

    DB_COMMENT = DB.Comment;
    DB_POST = DB.Post;
    DB_USER = DB.User;

    getAll = async (req) => {
        const params = {
            attributes: { exclude: ['userId'] },
            include: [
                { model: this.DB_USER, as: 'Owner_posts', attributes: ['user_name'] },
                { model: this.DB_USER, as: 'Users_added_like_to_post', attributes: ['user_name'] }
            ],
            order: [['date', 'DESC']]
        }
        req.query.id ? params['where'] = { userId: req.query.id } : null;
        const posts = await this.DB_POST.findAll(params).then(posts => {
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


    add = (req, res) => {
        const post = {
            id: uuidv4(),
            ...req.body,
            img: req.file.filename,
            date: new Date()
        }
        return (this.DB_POST.create(post)
            .then(data => {
                return ({
                    id: data.id,
                    title: data.title,
                    userId: data.userId,
                    description: data.description,
                    img: data.img,
                    data: (new Date(data.date).toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" }))
                })

            }).catch(err => err))
    }

    delete = (req) => {
        return this.DB_POST.findOne({ where: { id: req.params.id } }).then(async (post) => {
            await this.DB_POST.destroy({ where: { id: req.params.id } }
            ).then(() => {
                this.DB_COMMENT.destroy({ where: { postId: req.params.id } })
            }).then(() => fs.unlink(__dirname + '/../assets/imgOfPosts/' + post.img, () => { }))
            return await post
        })
    }

    edit = async (req, res) => {
        const newDate = { ...req.body };
        req.file ? newDate['img'] = req.file.filename : null;

        const post = await this.DB_POST.findOne({ where: { id: req.params.id } });
        const oldImgName = __dirname + '/../assets/imgOfPosts/' + post.img;
        this.DB_POST.update({ ...newDate }, { where: { id: req.params.id } }).then((data) => {
            req.file ? fs.unlink(oldImgName, () => { }) : null;
        });

        return {
            id: post.id,
            title: post.title,
            userId: post.userId,
            description: post.description,
            img: post.img,
            date: post.date.toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" }),
            ...newDate,
        }
    }
}

module.exports = new PostService();

