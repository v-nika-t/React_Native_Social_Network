const multer = require('multer');
const upload = multer({ dest: './assets' });

const PORT = 8000;

const methodOverride = require('method-override');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const authRoutes = require('./routs/auth.rout.js');
const crudRoutes = require('./routs/crud.rout.js');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(`${__dirname}/assets/imgOfPosts`));// доступ к папке assets. CСделать к поределенной папке  есди прошел аутитификацию //Саму папку указывать НЕ надо http://192.168.1.225:8000/0b64c8b9b5356ebd4dde944dba12dad5

app.use('/auth', authRoutes);
app.use('/user', crudRoutes('user'));
app.use('/comment', crudRoutes('comment'));
app.use('/post', upload.single('img'), crudRoutes('post'));



app.listen(PORT, '192.168.1.225', (err) => {
    if (err) { console.log(err) }
    else { console.log('Порт прослушиваеться: ' + PORT) }
})









