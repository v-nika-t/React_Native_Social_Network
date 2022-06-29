const { DataTypes, Sequelize } = require('sequelize');

const Chat = (sequelize) => {
    return sequelize.define('chat', {
        idChat: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        firstUserId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        secondUserId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
}




module.exports = Chat;