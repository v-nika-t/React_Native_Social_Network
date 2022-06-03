const { DataTypes } = require('sequelize');

const Friend = (sequelize) => {
    return sequelize.define('friend', {
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}

module.exports = Friend



