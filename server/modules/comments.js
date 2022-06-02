const { Sequelize } = require('sequelize');
const Users = require('./users');

const sequelize = new Sequelize("node-server", 'root', "root", {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: false
    }
});

const Comments = sequelize.define('comment', {
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
    }
})

Users.hasMany(Comments);

sequelize.sync({ force: false }).then(() => {
    console.log('Table have been created')
}).catch(err => console.log(err));

module.exports = Comments;
