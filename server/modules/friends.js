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

const RequestsToFriend = sequelize.define('friend_request', {
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Users.belongsToMany(Users, { through: RequestsToFriend, as: 'user', foreignKey: 'idUser' });
Users.belongsToMany(Users, { through: RequestsToFriend, as: 'friend', foreignKey: 'idFriend' });


sequelize.sync({ force: false }).then(() => {
    console.log('Tables have been created')
}).catch(err => console.log(err));

RequestsToFriend.findAll({ where: { idUser: 1 } })
    .then(x => {
        console.log(x);
    });



module.exports = RequestsToFriend



