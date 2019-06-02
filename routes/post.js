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
    })
    .catch(err => {
      res.json(err);
    });

})

module.exports = router;
