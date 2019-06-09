const express = require('express');
const router = express.Router();
const Price = require('../models/Price');

// find records by description, hospital
router.get('/records/lookup', (req, res) => {
  const queryDesc = req.query.procedureDescription;
  const hospital = req.query.hospital;
  // set a default if not specified
  if (req.query.limit) {
    limit = parseInt(req.query.limit)
  } else {
    limit = 20;
  }

  Price.find({
      // use regex to find strings that contain all of our request, case not sensitive
      // https://docs.mongodb.com/manual/reference/operator/query/regex/
      $and: [
        {procedureDescription: { "$regex": queryDesc, "$options": "i" }},
        {hospital: { "$regex": hospital, "$options": "i" }}
        // TODO: Price filter: floor and ceiling 
      ]
    })
    .limit(limit)
    .then(thisPost => {
      res.json(thisPost);
    })
    .catch(err => {
      res.json(err);
    });


})


module.exports = router;
