const connection = require('./connection');

const COLLECTION = 'posts';

const newPost = async (postDatas) => {
  try {
    const db = await connection();
    const post = await db.collection(COLLECTION).insertOne(postDatas);

    return {
      _id: post.insertedId,
      ...postDatas,
    };
  } catch (err) {
    console.log(`Erro no Model || ${err}`);
  }
};

const getAllPosts = async () => {
  try {
    const db = await connection();
    const posts = await db.collection(COLLECTION).find().toArray();

    return posts;
  } catch (err) {
    console.log(`Erro no Model || ${err}`);
  }
};

module.exports = {
  newPost,
  getAllPosts,
};
