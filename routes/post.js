// controllers where the POST requests will be handled at each URL endpoint
const express = require('express');
const router = express.Router();
const Price = require('../models/Price');

// index
router.get('/', (req, res) => {
  // POST [cost, procedure, hospital to here]
  Price.find().then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })

});
router.get('/push', (req, res) => {
  res.send("posting a price")
})
// get by ID from DB
router.get('/:id', (req, res) => {
  Price.findById(req.params.postId)
  .then(thisPost => {
    res.json(thisPost);
  })
  .catch(err =>{
    res.json(err);
  });
});
// get all recent DB posts todo:

router.post('/push', (req, res) => {
  console.log(req.body);
  res.send(req.body);

  /* // TODO: implement below when DB is connected
  const post = new Price({
      hospital: req.body.hospital,
      procedureDescription: req.body.procedureDescription.
      procedureCost: req.body.procedureCost
  });
  post.save() // to DB
  .then(data => {
    res.json(data); // respond back w/ original request if DB post worked
  });
  .catch(err => {
    res.json(err);
  });
  */
})

module.exports = router;
