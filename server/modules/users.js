const { Sequelize, DataTypes } = require('sequelize');

const User = (sequelize) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    canAllSeeAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,

    }

  })

}

module.exports = User;

