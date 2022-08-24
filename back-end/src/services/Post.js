const Post = require('../models/Post');

const postValidation = require('../validations/postValidations/postValidation');

const newPost = async (postDatas) => {
  try {
    const validatingDatas = postValidation.datasValidationCreate(postDatas);
    if (validatingDatas !== true) return validatingDatas;

    const toCreatePost = await Post.newPost(postDatas);
  
    return toCreatePost;
  } catch (err) {
    console.log(`Erro no Service || ${err}`);
  }
};

const getAllPosts = async () => Post.getAllPosts();

module.exports = {
  newPost,
  getAllPosts,
};
