const { DataTypes, Sequelize } = require('sequelize');

const Message = (sequelize) => {
    return sequelize.define('message', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('now')
        },
    })
}


module.exports = Message;