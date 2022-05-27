const mysql = require("mysql2");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("node-server", 'root', "root", {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: false
    }
});

const Posts = sequelize.define('post', {
    id: {
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

sequelize.sync({ force: false }).then(() => {
    console.log('Table have been created')
}).catch(err => console.log(err));

module.exports = Posts;

