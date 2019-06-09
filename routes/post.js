// controllers where the POST requests will be handled at each URL endpoint
const express = require('express');
const router = express.Router();
const Price = require('../models/Price');

// index - shows # of records in database
router.get('/', (req, res) => {
  // POST [cost, procedure, hospital to here]
  Price.estimatedDocumentCount({}).then(data => {
      res.json(data + " records")
    })
    .catch(err => {
      res.json(err)
    })

});
// bulk post
router.post('/push/bulk', (req, res) => {

  // convert incoming array into array of Price objects
  var prices = req.body.map(datum => {
    return new Price({
      hospital: datum.hospital,
      procedureDescription: datum.procedureName,
      procedureCost: datum.procedureCost
    });
  });

  Price.insertMany(prices)
    .then(docs => {
      console.log(docs);
      //res.send("server says: sent")
    })
    .catch(err => {
      res.send(err)
      console.log(err);
    });

  //res.send("Sent successfully");
});

// clear records from collection by hopsital
router.post('/records/destroy/byHospital', (req, res) => {
  const hospital = req.body.hospital
  console.log(hospital);
  res.send(req.body)

  Price.deleteMany({
      hospital: hospital
    }) // {hospital: "xyz"}
    .then(err => {
      console.log(err);
    })
})




module.exports = router;
