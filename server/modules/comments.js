const { Sequelize } = require('sequelize');

const Comment = (sequelize) => {
    return sequelize.define('comment', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })
}

module.exports = Comment;
