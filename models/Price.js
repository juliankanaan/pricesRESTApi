// mongoose model to add Price db things
const mongoose = require('mongoose');

var PriceSchema = mongoose.Schema({
  hospital: String,
  procedureDescription: String,
  procedureCost: String

});


// export schema
module.exports = mongoose.model("Price", PriceSchema);
