const express = require('express');
const cors = require('cors');

const User = require('../controllers/User');
const Post = require('../controllers/Post');
const { authorization } = require('../auth/authorization');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', User.login);
app.post('/user', User.createUser);

app.post('/post', authorization, Post.newPost);
app.get('/post', authorization, Post.getAllPosts);

module.exports = app;
