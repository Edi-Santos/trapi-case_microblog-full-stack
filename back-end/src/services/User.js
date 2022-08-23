const User = require('../models/User');

const login = async (userDatas) => User.login(userDatas);

const createUser = async (userDatas) => User.createUser(userDatas);

module.exports = {
  login,
  createUser,
};
