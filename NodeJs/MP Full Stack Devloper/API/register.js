let User = require('../models/user');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient;

module.exports = async function (req, res) {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    userName: req.body.uname,
    pwd: req.body.pwd,
    mobile: req.body.mobile,
    email: req.body.email,
    location: req.body.location
  });
  /*write your code here*/
  user.save((err, usr) => {
    if (err)
      return res.status(400).json(err);
    return res.json({
      status: 'success'
    })
  });

}