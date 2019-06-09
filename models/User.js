// mongoose model to add Price db things
const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 100,
    min: 4
  },
  email: {
    type: String,
    required: true,
    max: 40,
    min: 3
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 7
  },
  date: {
    type: Date,
    default: Date.now
  }

});


// export schema
module.exports = mongoose.model("User", UserSchema);
