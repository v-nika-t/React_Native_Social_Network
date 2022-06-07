const { Sequelize } = require('sequelize');

const Post = (sequelize) => {
    return sequelize.define('post', {
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
        img: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ext: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'jpg'
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false
        },


    })

}

module.exports = Post;
