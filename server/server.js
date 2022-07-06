const methodOverride = require('method-override');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const auth = require("./middleware/auth");
const authRoutes = require('./routs/auth.rout.js');
const userRoutes = require('./routs/user.rout.js');
const postRoutes = require('./routs/post.rout.js');
const commentRoutes = require('./routs/comment.rout.js');
const chatRoutes = require('./routs/chat.rout');
const chat = require('./socket/chat');

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

app.use(express.static(`${__dirname}/assets/imgOfPosts`));

app.use('/user/auth', authRoutes);
//app.use(auth);

app.use('/user', userRoutes);
app.use('/comment', commentRoutes);
app.use('/post', postRoutes);
app.use('/chat', chatRoutes);
chat(io);

server.listen(PORT, '192.168.1.225', (err) => {
    if (err) { throw err }
    else { }
})









