const Post = require('../models/Post');

const newPost = async (postDatas) => Post.newPost(postDatas);

module.exports = {
  newPost,
};
