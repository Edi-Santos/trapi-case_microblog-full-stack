const Post = require('../models/Post');

const newPost = async (postDatas) => Post.newPost(postDatas);

const getAllPosts = async () => Post.getAllPosts();

module.exports = {
  newPost,
  getAllPosts,
};
