const { Sequelize } = require('sequelize');
const User = require('./users');

const sequelize = new Sequelize("node-server", 'root', "root", {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: false
    }
});

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

User.hasMany(Post);

sequelize.sync({ force: true }).then(() => {
    console.log('Table have been created')
}).catch(err => console.log(err));


module.exports = Post;

/* userId */