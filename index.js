const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config'); // hide DB connection details
const cors = require('cors');
// imported routes
const postRoute = require('./routes/post');
const lookupRoute = require('./routes/lookup');
const auth = require('./routes/authenticate');

// middleware
app.use(cors()); // should fix x-origin request blocking
// max file size fix because bodyParser is a lazy POS 
app.use(bodyParser.json({
  limit: '50mb'
})); // posts should be interpreted as JSON
app.use('/api', postRoute);
app.use('/api', lookupRoute);
app.use('/api/user', auth);

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

app.listen(process.env.PORT, (req, res) => {
  console.log(`..server running on ${process.env.PORT}`);
});
