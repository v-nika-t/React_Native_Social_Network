const { DataTypes } = require('sequelize');

const Like = (sequelize, name) => {
    return sequelize.define(name, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    })
}

module.exports = Like




