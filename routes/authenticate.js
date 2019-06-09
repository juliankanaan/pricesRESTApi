/**
Manages endpoints & middleware for creating users {& hashing their passwords},
logging in users, and assigning auth tokens for user to make HTTP requests
*/
const router = require('express').Router();
const User = require('../models/User');
const {registerValidation,loginValidation} = require("../models/validation")
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
  // validate incoming
  const {error} = registerValidation(req.body);
  // bounce if validation fails
  if (error) return res.status(400).send(error.details[0].message);

  // does this user already exist? -- look for email
  const userExist = await User.findOne({email: req.body.email})
  if (userExist) return res.status(400).send("Email already registered with existing account")

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
    res.send({ userId: user._id })
  } catch (e) {
    res.status(400).send(e)
  }

}); // register
router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // user is registered right?
  const user = await User.findOne({email: req.body.email})
  if (!user) return res.status(400).send("Unrecognized login credentials")
  // check is password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send("Unrecognized login credentials") // NOTE: prev. tested, does actually independently check PW

  res.send({result: "success"})

}); // login
module.exports = router;
