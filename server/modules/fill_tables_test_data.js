const DB = require('./index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

function createRole() {
    DB.Role.create({ id: 1, name: 'user' });
    DB.Role.create({ id: 2, name: 'admin' });
}

//createRole()

const idOfUsers = [];
function createUsers(count) {
    while (count !== 0) {
        let id = uuidv4();
        idOfUsers.push(id);
        bcrypt.hash('12345', 10, (err, hash) => {
            DB.User.create({
                id,
                user_name: count + '_test',
                email: count + '_test@test.ru',
                password: hash
            });
        })
        count--;
    }
}

/* createUsers(10);
console.log(idOfUsers); */

const idOfPosts = [];
const nameImg = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg']; // существуюшие картиник в  assets

function createPostForSomeUsers(id_users = []) { //1 user 1 картинка
    let length = id_users.length;
    while (length !== 0) {
        let id = uuidv4();
        idOfPosts.push(id);
        DB.Post.create({
            id,
            title: 'TITTLE',
            userId: id_users[length - 1],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
            img: (Math.floor(Math.random() * (7 - 1)) + 1) + '.jpg',
        });

        length--;
    }
}


createPostForSomeUsers([
    'd9ea6d73-9434-4475-9e7e-52a5ffce9ca6',
    '615fae0a-aa5f-4389-9a55-b6bf6b7b5638',
    '012629c2-ff60-41d9-8a6c-4b08e0b8fba9',
    'c54cffc0-f131-4189-adfb-e4cb84666df7',
    '380f1e6f-25c8-4d0e-b136-1fc37f4f41f7',
    '01363512-0a3f-4dce-a663-63fa35dea5b2',
    '097316be-2eeb-4180-87da-11614860ba1e',
    'eccb889c-13a6-426e-984e-dab6b463b53d',
    '3714a898-f182-4c97-98aa-21cc99cffef6',
    'd4613146-b889-4078-adf9-a6e731e7e375'
])

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



//DB.User.findAll({ raw: true }).then(data => console.log(data))
DB.Post.findAll({ raw: true, where: { "userId": "a06e3870-eaf1-434c-9257-eaac40de2b97" } }).then(data => console.log(data))
//DB.Post.findAll({ raw: true, where: { userId: 'a1f9f054-f95d-49db-b9eb-27f75710ef7d' } }).then(data => console.log(data))
//DB.Role.findAll({raw: true}).then(data => console.log(data))

[
    'e3b0043e-119b-4a4c-b0ce-463b67c9b3e4',
    '9852d9f9-1e5a-48ab-acb9-72e4ef9f71bd',
    'c9fd0194-9c9a-4c3f-abcf-aef351fd35c9',
    'b79ac9d3-e8e7-4351-9254-4ac0a5ffc642',
    '7cf02fcd-707a-4433-8156-96634a49cb93',
    '69a0827c-fde7-4f8f-8b65-69551a75891e',
    '62382fc5-5926-4668-b240-4826eb475bc7',
    'e944d0d6-2465-45a3-9f43-3f22f4418103',
    'fc1ea4b9-568b-4fd9-8561-03fa63f81b90',
    'b92f6d95-bcea-4187-8c2b-8b8a3090bf48'
]

