let User = require('../models/user');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient



module.exports = function (req, res) {

   /*write your code here*/
   User.findOne({ userName: req.body.uname, pwd: req.body.pwd }, (err, user) => {
      if (err)
         return res.status(401).json(err);
      return res.json({
         success: true,
         message: 'Authentication successful!',
         uid: user._id
      });
   })

}