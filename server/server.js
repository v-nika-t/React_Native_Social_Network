const PORT = 8000;

const methodOverride = require('method-override');
const express = require('express');
const app = express();

const userApiRotes = require('./routs/api.user.rout.js');
const authApiRoutes = require('./routs/api.auth.rout.js');
var cors = require('cors');
var bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use('/', authApiRoutes);
app.use(userApiRotes);



app.listen(PORT, '192.168.1.225', (err) => {
    if (err) { console.log(err) }
    else { console.log('Порт прослушиваеться: ' + PORT) }
})









