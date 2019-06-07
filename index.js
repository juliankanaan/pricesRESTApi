const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config'); // hide DB connection details
// imported routes
const postRoute = require('./routes/post');

// middleware -- modules that run when routes are hit
app.use(bodyParser.json()); // posts should be interpreted as JSON
app.use('/api', postRoute);


// routes
app.get('/', (req, res) => {
  //console.log("...user requesting home");
  res.send("home page");
});


//  DB connect
mongoose.connect(
  process.env.DB_CONNECTION, {
    useNewUrlParser: true
  },
  () => {
    console.log("connected to db...");
  });

app.listen(4000, (req, res) => {
  console.log("..server running");
});
