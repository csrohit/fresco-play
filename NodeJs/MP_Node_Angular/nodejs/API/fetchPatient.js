let Patient=require('../models/patients');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient;
const patients = require('../models/patients');

module.exports=function(req,res){
    
    /*write your code here*/

    Patient.find((err, patients) => {
      if(err)
      return res.status(401).json(err);
      return res.json(patients);
    })
  }