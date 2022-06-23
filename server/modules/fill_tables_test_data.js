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

/* createUsers(4);
console.log(idOfUsers); */

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


/* createPostForSomeUsers([
  '542b56b5-04fd-4248-a528-a1473a0ddcf9',
  '59d8669a-8ec1-40d6-b383-46233b2c584f',
  'c62e77bf-a265-4420-a76d-df24a0a6d1fe',
  'e34d7388-e352-484a-9b4a-1927ae8ed391',
]) 
 */
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

//createPostsForOneUser('a1f9f054-f95d-49db-b9eb-27f75710ef7d',10)

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


//DB.Role.findAll({raw: true}).then(data => console.log(data))

//DB.User.findAll({ raw: true }).then(data => console.log(data))

//DB.Post.findAll({ raw: true }).then(data => console.log(data))
//DB.Post.findAll({ raw: true, where: { userId: 'a1f9f054-f95d-49db-b9eb-27f75710ef7d' } }).then(data => console.log(data))

//DB.Comment.findAll({ raw: true }).then(data => console.log(data))

//DB.LikeofComment.findAll({ raw: true }).then(data => console.log(data))
//DB.LikeofPost.findAll({ raw: true }).then(data => console.log(data))

//DB.Friend.findAll({ raw: true }).then(data => console.log(data))



