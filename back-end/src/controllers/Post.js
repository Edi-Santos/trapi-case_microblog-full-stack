const Post = require('../services/Post');

const newPost = async (req, res) => {
  const postDatas = req.body;

  try {
    const post = await Post.newPost(postDatas);

    return res.status(201).json({ post });
  } catch (err) {
    console.log(`Erro no Controller || ${err}`);
  }
};

module.exports = {
  newPost,
};
