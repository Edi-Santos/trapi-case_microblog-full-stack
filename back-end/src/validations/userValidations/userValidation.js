const schema = require('./loginDatasSchema');
const errorMessage = require('../errorMessages');

const datasValidationLogin = (loginDatas) => {
  const { error } = schema.validate(loginDatas);

  if (error) {
    const { message } = error.details[0];

    return { status: 400, message };
  }

  return true;
};

const userNotFound = (user) => {
  if (user === null) return errorMessage.userNotFound;

  return true;
};

module.exports = {
  datasValidationLogin,
  userNotFound,
};
