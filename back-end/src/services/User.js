const User = require('../models/User');

const userValidation = require('../validations/userValidations/userValidation');

const login = async (userDatas) => {
  try {
    const validatingDatas = userValidation.datasValidationLogin(userDatas);
    if (validatingDatas !== true) return validatingDatas;

    const toLogin = await User.login(userDatas);

    const validatingUser = userValidation.userNotFound(toLogin);
    if (validatingUser !== true) return validatingUser;

    return toLogin;
  } catch (err) {
    console.log(`Erro no Service || ${err}`);
  }
};

const createUser = async (userDatas) => {
  try {
    const validatingDatas = userValidation.datasValidationCreate(userDatas);

    if (validatingDatas !== true) return validatingDatas;

    const toCreateUser = await User.createUser(userDatas);
    
    return toCreateUser;
  } catch (err) {
    console.log(`Erro no Service || ${err}`);
  }
};

module.exports = {
  login,
  createUser,
};
