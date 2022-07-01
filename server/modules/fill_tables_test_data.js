const DB = require('./index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

function createRole() {
    DB.Role.create({ id: 1, name: 'user' });
    DB.Role.create({ id: 2, name: 'admin' });
}


//createRole()

const idOfUsers = [];
async function createUsers(count) {
    while (count !== 0) {
        let id = uuidv4();
        idOfUsers.push(id);

        const password = await bcrypt.hash('12345', 10);
        const result = await DB.User.create({
            id,
            user_name: count + '_test',
            email: count + '_test@test.ru',
            password
        });
        count--;
    }
}

//createUsers(5);
//console.log(idOfUsers); 

const idOfPosts = [];
const nameImg = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg']; // существуюшие картиник в  assets

async function createPostForSomeUsers(id_users = []) { //1 user 1 картинка
    let length = id_users.length;
    while (length !== 0) {
        let id = uuidv4();
        idOfPosts.push(id);
        await DB.Post.create({
            id,
            title: 'TITTLE',
            userId: id_users[length - 1],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            img: (Math.floor(Math.random() * (7 - 1)) + 1) + '.jpg',
        });

        length--;
    }
}


//createPostForSomeUsers(['f5fcbe58-5d67-4e65-ad56-70bfe9568c20', 'dc8c0539-a88a-4116-9c0f-5978a7a95f03', 'c3c94c39-b507-46d1-8421-0918c7395288', 'bcb53390-0220-4ede-ad06-1c93807419bf', 'a8b7bcdc-a383-43db-bfd2-80c4eeb83175', '083c447e-8856-4221-b81b-c67386a584a0']) 

/*
createPostForSomeUsers(idOfUsers)
console.log(idOfPosts)
*/


function createPostsForOneUser(id_users, count) {
    while (count !== 0) {
        DB.Post.create({
            id: uuidv4(),
            title: count + '_TITTLE',
            userId: id_users,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            img: (Math.floor(Math.random() * (7 - 1)) + 1) + '.jpg',
        });
        count--;
    }

}

//createPostsForOneUser('083c447e-8856-4221-b81b-c67386a584a0',4)

function createComment(postId, userId) {
    DB.Comment.create({
        id: uuidv4(),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: new Date(),
        userId,
        postId,
    });
}

/* createComment('5538eac8-f9ca-43af-b9fb-1657cdd9d705', 'e34d7388-e352-484a-9b4a-1927ae8ed391');
createComment('5538eac8-f9ca-43af-b9fb-1657cdd9d705', 'c62e77bf-a265-4420-a76d-df24a0a6d1fe');
createComment('5538eac8-f9ca-43af-b9fb-1657cdd9d705', '59d8669a-8ec1-40d6-b383-46233b2c584f');
 */

function createLikeofComment(commentId, userId) {
    DB.LikeofComment.create({
        userId,
        commentId,
    });
}

//createLikeofComment('069d7774-96ee-4ca3-952c-755fad84e3c0', '59d8669a-8ec1-40d6-b383-46233b2c584f')

function createStringInFriend(userId, friendId, status) {
    DB.Friend.create({
        id: uuidv4(),
        friendId,
        userId,
        status
    })
}


/* createStringInFriend('c7940b6c-ac94-44b6-9b6a-e145dc40a101', 'e34d7388-e352-484a-9b4a-1927ae8ed391', true)
createStringInFriend('e34d7388-e352-484a-9b4a-1927ae8ed391', 'c7940b6c-ac94-44b6-9b6a-e145dc40a101', true)
createStringInFriend('c7940b6c-ac94-44b6-9b6a-e145dc40a101', 'c62e77bf-a265-4420-a76d-df24a0a6d1fe', false)

 */


/* DB.Chat.create({
    idChat: uuidv4(),
    firstUserId: '024a9006-a010-4ce2-817a-8c67d04cf70e',
    secondUserId: '0b80e0cd-39a9-4569-a40f-0c10e26216e6',
});
 */

//DB.Chat.destroy({ where: { idChat: '828603c1-f96e-47f4-aeea-7951d2488526' } });

/*
const { Op } = require("sequelize");

DB.Chat.findAll({
    where: {
        [Op.or]: [{
            firstUserId: '024a9006-a010-4ce2-817a-8c67d04cf70e',
            secondUserId: '0b80e0cd-39a9-4569-a40f-0c10e26216e6'
        }, {
            firstUserId: '0b80e0cd-39a9-4569-a40f-0c10e26216e6',
            secondUserId: '024a9006-a010-4ce2-817a-8c67d04cf70e'
        }]
    }
}).then(data => console.log('Hello', data))

 */

/* DB.Message.create({
   id: uuidv4(),
   message: "Test_3_test",
   userId: '4ce9f17f-497c-4784-be18-31e474ae8f14',
   chatId: '231219bd-5936-4769-b26b-eb252291273c',
});

DB.Message.create({
   id: uuidv4(),
   message: "Test_12345",
   userId: '35273055-9c21-485b-bdfd-f2c5551f3e6d',
   chatId: '231219bd-5936-4769-b26b-eb252291273c',
}); */




//DB.Role.findAll({raw: true}).then(data => console.log(data))

//DB.User.findAll({ raw: true }).then(data => console.log(data))

//DB.Post.findAll({ raw: true }).then(data => console.log(data))
//DB.Post.findAll({ raw: true, where: { userId: 'a1f9f054-f95d-49db-b9eb-27f75710ef7d' } }).then(data => console.log(data))

//DB.Comment.findAll({ raw: true }).then(data => console.log(data))

//DB.LikeofComment.findAll({ raw: true }).then(data => console.log(data))
//DB.LikeofPost.findAll({ raw: true }).then(data => console.log(data))

//DB.Friend.findAll({ raw: true }).then(data => console.log(data))

//DB.Message.findAll({ raw: true }).then(data => console.log(data))

//DB.Chat.findAll({ raw: true }).then(data => console.log(data))

/* DB.Friend.create({
    id: uuidv4(),
    status: true,
    userId: '083c447e-8856-4221-b81b-c67386a584a0',
    friendId: '35273055-9c21-485b-bdfd-f2c5551f3e6d',
 });  */

/* DB.Friend.create({
    id: uuidv4(),
    status: true,
    userId: '35273055-9c21-485b-bdfd-f2c5551f3e6d',
    friendId: '083c447e-8856-4221-b81b-c67386a584a0',
 });   */

/*  DB.Friend.create({
  id: uuidv4(),
  userId: '083c447e-8856-4221-b81b-c67386a584a0',
  friendId: '4ce9f17f-497c-4784-be18-31e474ae8f14',
});   */

DB.Post.findAll({ raw: true }).then(data => console.log(data))
//DB.User.update({ roleId: 2 }, { where: { id: '021aa121-c689-407d-8d3f-93aa814169bb' } })
