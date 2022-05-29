const multer = require('multer');
const upload = multer({ dest: './assets' });

const PORT = 8000;

const methodOverride = require('method-override');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const authRoutes = require('./routs/auth.rout.js');
const crudRotes = require('./routs/crud.rout.js');

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static('../assets'));// доступ к папке assets. CСделать к поределенной папке  есди прошел аутитификацию

app.use('/auth', authRoutes);
app.use('/user', crudRotes('user'));
app.use('/post', upload.single('img'), crudRotes('post'));
app.use('/comment', crudRotes('comment'));


app.listen(PORT, '192.168.1.225', (err) => {
    if (err) { console.log(err) }
    else { console.log('Порт прослушиваеться: ' + PORT) }
})









