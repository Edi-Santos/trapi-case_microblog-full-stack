const User = require('../models/User');

const login = async (userDatas) => User.login(userDatas);

module.exports = {
  login,
};
