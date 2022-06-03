const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("node-server", 'root', "root", {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: false
    }
});

const User = require('./users')(sequelize);
const Post = require('./posts')(sequelize);
const Comment = require('./comments')(sequelize);
const Friend = require('./friends')(sequelize);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.belongsToMany(User, { through: Friend, as: 'user', foreignKey: 'userId' });
User.belongsToMany(User, { through: Friend, as: 'subscriber', foreignKey: 'friendId' });

/* User.hasMany(Friend);
Friend.belongsTo(User);
 */

sequelize.sync({ alter: true }).then(() => {
    console.log('Tables have been created')
}).catch(err => console.log(err));




/* const x = async () => {
    const a = await Friend.findAll({ where: { userId: 1 }, include: User });
    console.log(JSON.stringify(a, null, 2));
};
x(); */


module.exports = { User, Post, Comment, Friend }
