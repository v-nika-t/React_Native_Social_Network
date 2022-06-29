const multer = require('multer');
const storage = require('./storage/storage');

const upload = multer({ storage: storage });
const PORT = 8000;

const methodOverride = require('method-override');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


const authRoutes = require('./routs/auth.rout.js');
const crudRoutes = require('./routs/crud.rout.js');
const likesRoutes = require('./routs/likes.rout.js');
const userRoutes = require('./routs/user.rout.js');
const auth = require("./middleware/auth");

const DB = require('./modules/index');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(`${__dirname}/assets/imgOfPosts`));// доступ к папке assets. CСделать к поределенной папке  есди прошел аутитификацию //Саму папку указывать НЕ надо http://192.168.1.225:8000/0b64c8b9b5356ebd4dde944dba12dad5

app.use('/user/auth', authRoutes);
app.use(auth);

app.use('/user', userRoutes);
app.use('/comment', crudRoutes('comment'));
app.use('/post', upload.single('img'), crudRoutes('post'));
app.use('/comment/likes', likesRoutes('LikeofComment'));
app.use('/post/likes', likesRoutes('LikeofPost'));

app.post('/chat/creat', async (req, res) => {
    const { firstUserId, secondUserId } = req.body

    const resultOfFind = await DB.Chat.findAll({
        raw: true,
        where: {
            [Op.or]: [{
                firstUserId,
                secondUserId
            }, {
                firstUserId: secondUserId,
                secondUserId: firstUserId
            }]
        }
    });

    if (resultOfFind.length == 0) {
        console.log("if");
        const resultOfFCreate = await DB.Chat.create({
            idChat: uuidv4(),
            firstUserId,
            secondUserId,
        });
        res.status(200).json({ idChat: resultOfFCreate.idChat, messages: [] })
    } else {
        const messages = await DB.Message.findAll({
            raw: true,
            where: { chatId: resultOfFind[0].idChat },
            include: { model: DB.User, as: 'Owner_Messages', attributes: ['user_name', 'id'] },
            order: [['date', 'DESC']]
        })
        res.status(200).json({
            idChat: resultOfFind[0].idChat, messages: messages.map(item => {
                return ({
                    ...item,
                    date: (new Date(item.date).toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" }))
                })
            })
        });
    }

})

io.on('connection', (socket) => {
    socket.on('CHAT', (data) => {
        const { idChat, id } = data;
        socket.join(idChat);
        socket.to(idChat).emit('ONLINE', id)
    });

    socket.on('SENT_MESSAGE', (data) => {
        console.log('SENT_MESSAGE', data)
        socket.join(data.chatId);
        const id = uuidv4();
        const date = new Date();

        DB.Message.create({ id, date, message: data.message, userId: data.userId, chatId: data.chatId }
        ).then(io.in(data.chatId).emit('GET_MESSAGE', {
            id,
            ...data,
            date: date.toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" })
        }))
    })

})




server.listen(PORT, '192.168.1.225', (err) => {
    if (err) { console.log(err) }
    else { console.log('Порт прослушиваеться: ' + PORT) }
})









