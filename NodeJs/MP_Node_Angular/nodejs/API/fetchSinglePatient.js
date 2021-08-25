let Patient = require('../models/patients');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient


module.exports = function (req, res) {
console.log(req.body);
  /*write your code here*/
  Patient.find({ _id: req.body.patientId }, (err, patient) => {
    if (err)
      return res.status(401).json(err);

    return res.json(patient)
  });
}