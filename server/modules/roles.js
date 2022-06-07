const { DataTypes } = require('sequelize');
const Role = (sequelize) => {
    return sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}

module.exports = Role



