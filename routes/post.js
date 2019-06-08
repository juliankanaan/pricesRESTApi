// controllers where the POST requests will be handled at each URL endpoint
const express = require('express');
const router = express.Router();
const Price = require('../models/Price');

// index - shows all DB posts
router.get('/', (req, res) => {
  // POST [cost, procedure, hospital to here]
  Price.estimatedDocumentCount({}).then(data => {
      res.json(data + " records")
    })
    .catch(err => {
      res.json(err)
    })

});
// get data via filters
router.get('records/:maxPrice.:minPrice.:limit', (req, res) => { // ../records/1200.500.10
  // projection

  Price.find()
    .where('procedureCost').gt(req.params.minPrice).lt(req.params.maxPrice)
    .limit(req.params.limit)
    .then(matches => {
      res.json(matches)
    })
    .catch(err => {
      res.json(err)
    });
});
// get via procedureDescription
router.get('/records/description', (req, res) => { // records/concussion.20
  const queryDesc = req.query.procedureDescription
  console.log(req.query)
  if (!req.body.limit) {
    limit = 20; // default to 20 results if not specified,
  }

  Price.find(
      // use regex to find strings that contain all of our request, case not sensitive
      // https://docs.mongodb.com/manual/reference/operator/query/regex/
      {procedureDescription: { "$regex": queryDesc, "$options": "i" }}
    )
    .limit(limit)
    .then(thisPost => {
      res.json(thisPost);
    })
    .catch(err => {
      res.json(err);
    });
})
// get via hospital
router.get('/records/hospital', (req, res) => { // records/concussion.20
  const queryHospital = req.query.hospital
  console.log(req.query)
  const limit = parseInt(req.query.limit)

  Price.find(
      // use regex to find strings that contain all of our request, case not sensitive
      // https://docs.mongodb.com/manual/reference/operator/query/regex/
      {hospital: { "$regex": queryHospital, "$options": "i" }}
    )
    .limit(limit)
    .then(thisPost => {
      res.json(thisPost);
    })
    .catch(err => {
      res.json(err);
    });
})
// get by ID from DB
router.get('/:id', (req, res) => {
  Price.findById(req.params.postId)
    .then(thisPost => {
      res.json(thisPost);
    })
    .catch(err => {
      res.json(err);
    });
});
// clear records from collection

router.post('/records/delete', (req, res) => {
  Price.deleteMany({}) // {hospital: "xyz"}
    .then(err => {
      console.log(err);
    })
})
// clear records from collection by hopsital

router.post('/records/delete/byHospital', (req, res) => {
  const hospital = req.body.hospital
  console.log(hospital);
  res.send(req.body)


  Price.deleteMany({hospital: hospital}) // {hospital: "xyz"}
    .then(err => {
      console.log(err);
    })
})

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
  //console.log(prices); // success. converts all incoming data into Price objects

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

// POST a price data
router.post('/push', (req, res) => {
  console.log("...trying to post data... ");
  const post = new Price({
    hospital: req.body.hospital,
    procedureDescription: req.body.procedureName,
    procedureCost: req.body.procedureCost
  });
  post.save() // to DB
    .then(data => {
      res.json(data); // respond back w/ original request if DB post worked
      //console.log("success");
    })
    .catch(err => {
      res.json(err);
    });

});

module.exports = router;
