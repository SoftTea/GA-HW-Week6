const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const methodOverride = require('method-override');

require('./db/db');

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
  extended:false
}));

const userController = require('./controller/users.js');

app.use('/users', userController);

const photosController = require('./controller/photos.js');

app.use('/photos', photosController);

app.listen(3000, ()=>{
  console.log('Connected to port 3000')
})