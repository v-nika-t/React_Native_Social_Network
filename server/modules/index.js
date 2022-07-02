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
const Role = require('./roles')(sequelize);
const LikeofComment = require('./likes')(sequelize, 'likes_of_comments');
const LikeofPost = require('./likes')(sequelize, 'likes_of_posts');
const Chat = require('./chat/chat')(sequelize);
const Message = require('./chat/message')(sequelize);


Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(Post, { as: 'User_posts', onDelete: 'cascade' });
Post.belongsTo(User, { as: 'Owner_posts', foreignKey: 'userId' });

User.hasMany(Comment, { as: 'User_comments' });
Comment.belongsTo(User, { as: 'Owner_comments', foreignKey: 'userId' });

Post.hasMany(Comment);
Comment.belongsTo(Post);

//Таблица ДРУЗЕЙ
User.belongsToMany(User, { through: Friend, as: 'user', foreignKey: 'userId' });
User.belongsToMany(User, { through: Friend, as: 'subscriber', foreignKey: 'friendId' });

User.hasMany(Friend);
Friend.belongsTo(User, { foreignKey: 'friendId' });

//Таблицы лайков для ПОСТОВ/КОММЕНТАРИЕВ
User.belongsToMany(Comment, { through: LikeofComment, as: 'Comments_with_user_likes', uniqueKey: 'id' });
Comment.belongsToMany(User, { through: LikeofComment, as: 'Users_added_like_to_comment', uniqueKey: 'id' });

User.belongsToMany(Post, { through: LikeofPost, as: 'Posts_with_user_likes', uniqueKey: 'id' });
Post.belongsToMany(User, { through: LikeofPost, as: 'Users_added_like_to_post', uniqueKey: 'id' });

// Таблица чатов

User.hasMany(Chat);
Chat.belongsTo(User, {
    as: 'firstUser', foreignKey: 'firstUserId',
    onDelete: 'cascade'
});

User.hasMany(Chat);
Chat.belongsTo(User, { as: 'secondUser', foreignKey: 'secondUserId', onDelete: 'cascade' });

User.hasMany(Message, { as: 'User_Messages' });
Message.belongsTo(User, { as: 'Owner_Messages', foreignKey: 'userId', onDelete: 'cascade' });

Chat.hasMany(Message, { as: 'Message' });
Message.belongsTo(Chat, { as: 'Chat', foreignKey: 'chatId' });

sequelize.sync({ force: false  /* force: false    */ }).then(() => {
    console.log('Tables have been created')
}).catch(err => console.log(err));


module.exports = { User, Post, Comment, Friend, Role, LikeofComment, LikeofPost, Chat, Message }
