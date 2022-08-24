const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  text: Joi.string().max(200).required(),
});
