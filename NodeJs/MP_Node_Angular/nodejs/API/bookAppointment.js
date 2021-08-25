let Appointment=require('../models/appointments');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports=function(req,res){
    
   const appointment = new Appointment({
      _id: mongoose.Types.ObjectId(),
      fname: req.body.fname,
	lname:  req.body.lname,
    disease: req.body.fname,
    priority: req.body.priority,
    AppointmentDate: req.body.AppointmentDate,
    patientId: req.body.patientId,
    bookingTime:  req.body.bookingTime
   });
  

   /*write your code here*/
   appointment.save((err, apt) => {
      if (err)
          return res.status(400).json(err);
      return res.json(apt);
  });
    
  }