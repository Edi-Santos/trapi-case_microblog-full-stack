const connection = require('./connection');

const COLLECTION = 'users';

const login = async (userDatas) => {
  const { email, password } = userDatas;
  try {
    const db = await connection();
    const user = await db.collection(COLLECTION).findOne({ email, password });
  
    return user;
  } catch (err) {
    console.log(`Erro no Model || ${err}`);
  }
};

module.exports = {
  login,
};
