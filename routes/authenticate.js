/**
Manages endpoints & middleware for creating users {& hashing their passwords},
logging in users, and assigning auth tokens for user to make HTTP requests
*/
const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require("../models/validation")


router.post('/register', async (req, res) => {
  // validate incoming
  const {error} = registerValidation(req.body);
  // bounce if validation fails
  if (error) return res.status(400).send(error.details[0].message);

  // does this user already exist? -- look for email
  const userExist = await User.findOne({email: req.body.email})
  if (userExist) return res.status(400).send("Email already registered with existing account")

  // TODO: hash password w/ bcrypt

  // create User object from model
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  // insert
  try {
    const savedUser = await user.save();
    res.send(savedUser)
  } catch (e) {
    res.status(400).send(e)
  }

});

module.exports = router;
