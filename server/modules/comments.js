const { DataTypes, Sequelize } = require('sequelize');

const Comment = (sequelize) => {
    return sequelize.define('comment', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('now')
        },
    })
}

module.exports = Comment;
