const express = require('express');

const User = require('../controllers/User');

const app = express();
app.use(express.json());

app.post('/login', User.login);
app.post('/user', User.createUser);

module.exports = app;
