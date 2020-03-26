const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', ()=>{
    console.log('Connected to database' + config.database);
})

mongoose.connection.on('error', (err)=>{
    console.log('error to database' + err);
})

const app = express();

const users = require('./routers/users');
const post = require('./routers/post');

//port
const port = 3000;

//CORS middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//bodyParse middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/post', post);

//INDEX Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

//SETTING PORT
app.listen(port, () => {
    console.log('Server started on port' + port);
})