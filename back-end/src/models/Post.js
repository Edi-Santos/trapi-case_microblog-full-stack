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

module.exports = {
  newPost,
};
