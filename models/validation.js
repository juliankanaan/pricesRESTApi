// validation
const Joi = require('@hapi/joi');

const registerValidation = (data) => {

  const schema = {
    name: Joi.string().min(4).max(100).required(),
    email: Joi.string().min(3).max(40).required(),
    password: Joi.string().min(7).max(1024).required()
  }
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {

  const schema = {
    name: Joi.string().min(4).max(100).required(),
    email: Joi.string().min(3).max(40).required(),
    password: Joi.string().min(7).max(1024).required()
  }
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
