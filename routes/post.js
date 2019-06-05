// controllers where the POST requests will be handled at each URL endpoint
const express = require('express');
const router = express.Router();
const Price = require('../models/Price');

// index - shows all DB posts
router.get('/', (req, res) => {
  // POST [cost, procedure, hospital to here]
  Price.find().then(data => {
      res.json(data)
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
router.get('records/:procedureDescription.:limit', (req, res) => { // records/concussion.20
  Price.find()
    .where('procedureDescription').equals(req.body.procedureDescription)
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
// POST a price data
router.post('/push', (req, res) => {
  console.log("...trying to post data... ");
  const post = new Price({
    hospital: req.body.hospital,
    procedureDescription: req.body.procedureDescription,
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
