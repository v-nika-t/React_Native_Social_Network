
const methodOverride = require('method-override');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const storage = require('./storage/storage');

const auth = require("./middleware/auth");
const authRoutes = require('./routs/auth.rout.js');
const crudRoutes = require('./routs/crud.rout.js');
const likesRoutes = require('./routs/likes.rout.js');
const userRoutes = require('./routs/user.rout.js');
const chatRoutes = require('./routs/chat.rout');
const chat = require('./socket/chat');

const upload = multer({ storage: storage });
const PORT = 8000;

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/user/auth', authRoutes);
app.use(auth);
chat(io);


app.use('/user', userRoutes);
app.use('/comment', crudRoutes('comment'));
app.use('/post', upload.single('img'), crudRoutes('post'));
app.use('/comment/likes', likesRoutes('LikeofComment'));
app.use('/post/likes', likesRoutes('LikeofPost'));
app.use('/chat', chatRoutes);


server.listen(PORT, '192.168.1.225', (err) => {
    if (err) { console.log(err) }
    else { console.log('Порт прослушиваеться: ' + PORT) }
})









