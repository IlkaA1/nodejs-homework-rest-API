const Joi = require("joi");

const emailValidation =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

const schemaForAuth = Joi.object({
  email: Joi.string().pattern(emailValidation).required(),
  password: Joi.string().min(6).required(),
});

const schemaEmail = Joi.object({
  email: Joi.string().pattern(emailValidation).required(),
});

module.exports = { schemaForAuth, schemaEmail };
