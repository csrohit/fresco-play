let Patient=require('../models/patients');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient;
const patients = require('../models/patients');

module.exports=async function(req,res){

   /*write your code here*/
   const patient = new Patient({
      _id: mongoose.Types.ObjectId(),
      fname: req.body.uname,
      lname: req.body.pwd,
      gender: req.body.gender,
      dob: req.body.dob,
      mobile: req.body.mobile,
      email: req.body.email,
      desc: req.body.desc,
      userId: req.body.userId
    });
    console.log(patient);
    /*write your code here*/
    patient.save((err, patient) => {
      if (err)
        return res.status(400).json(err);
      return res.json({
        status: 'success'
      })
    });
  }