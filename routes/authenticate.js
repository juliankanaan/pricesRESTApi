/**
Manages endpoints & middleware for creating users {& hashing their passwords},
logging in users, and assigning auth tokens for user to make HTTP requests
*/
const router = require('express').Router();
const User = require('../models/User');
const {registerValidation,loginValidation} = require("../models/validation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  // validate incoming
  const {error} = registerValidation(req.body);
  // bounce if validation fails -- Note: Joi library tells which field failed and why
  if (error) return res.status(400).send({result: {type: "failure", message: error.details[0].message}});

  // does this user already exist? -- look for email
  const userExist = await User.findOne({email: req.body.email})
  if (userExist) return res.status(400).send({result: {type: "failure", message: "Email already registered with existing account"}})

  // TODO: hash password w/ bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);


  // create User object from model
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  // insert
  try {
    const savedUser = await user.save();
    res.send({result: {type: "success", message: "Registered"}})
  } catch (e) {
    res.status(400).send(e)
  }

}); // register

//login
router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send({result: {type: "failure", message: error.details[0].message}});

  // user is registered right?
  const user = await User.findOne({email: req.body.email})
  if (!user) return res.status(400).send({result: {type: "failure", message: "Unrecognized login credentials"}})
  // check is password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  // invalid pass
  if (!validPass) return res.status(400).send({result: {type: "failure", message: "Unrecognized login credentials"}}) // NOTE: prev. tested, does actually independently check PW

  // create & assign token
  const token = jwt.sign({_id: user._id}, process.env.HASH_SECRET)
  res.header('auth-token', token).send({result: {type: "success", authToken: token, message: "logged in"}})


}); // login
module.exports = router;
