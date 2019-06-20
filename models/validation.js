// validation
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const registerValidation = (data) => {

  const schema = {
    name: Joi.string()
      .min(4)
      .max(100)
      .required(),
    email: Joi.string()
      .min(3)
      .max(40)
      .required(),
    password: Joi.string()
      .min(7)
      .max(1024)
      .required()
  }
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {

  const schema = {
    name: Joi.string()
      .min(4)
      .max(100)
      .required(),
    email: Joi.string()
      .min(3)
      .max(40)
      .required(),
    password: Joi.string()
      .min(7)
      .max(1024)
      .required()
  }
  return Joi.validate(data, schema);
};
// any time we want to check the auth token
// ie. when a protected endpoint is hit
const passiveValidation = (token) => {
  // do request headers contain the authToken?

  if (!token) return res.status(401).send({result: {type: "failure", message: "Token not found in header"}})

  // decode JWT
  jwt.verify(token, process.env.HASH_SECRET, (err, decoded) => {
    if (err) return res.status(400).send({result: {type: "failure", message: "Could not process token included in header"}})

    try {
      const {user} = decoded;

    } catch (err) {
      console.log(err);
    }
  });
  // whole user model: get id from user._id
  // return user;

  return token;
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.passiveValidation = passiveValidation;
