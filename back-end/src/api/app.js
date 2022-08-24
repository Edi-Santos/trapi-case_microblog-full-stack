const express = require('express');

const User = require('../controllers/User');
const Post = require('../controllers/Post');
const { authorization } = require('../auth/authorization');

const app = express();
app.use(express.json());

app.post('/login', User.login);
app.post('/user', User.createUser);

app.post('/post', authorization, Post.newPost);

module.exports = app;
