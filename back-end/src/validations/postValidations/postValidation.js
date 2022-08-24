const createSchema = require('./createDatasSchema');

const datasValidationCreate = (postDatas) => {
  const { error } = createSchema.validate(postDatas);

  if (error) {
    const { message } = error.details[0];

    return { status: 400, message };
  }

  return true;
};

module.exports = {
  datasValidationCreate,
};
