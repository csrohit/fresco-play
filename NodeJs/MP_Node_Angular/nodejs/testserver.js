
const express = require('express');
const bodyParser = require('body-parser');
let middleware = require('./middleware');
let path=require('path');



var mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/PatientManagement', {useNewUrlParser: true},(err) => {
  if(!err){
    console.log("connected");
  }else{
    console.log("connection failed: "+err);
  }
});


// Starting point of the server
  let app = express(); // Export app for other routes to use
  let handlers = require('./handlersTest/handler.js');
  //const port = process.env.PORT || 8000;
  const port= 9000;
  //app.use(express.static(__dirname + '/../frontend/build/'));
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});
  // Routes & Handlers
  app.post('/login', handlers.login);      //done
  app.post('/register',handlers.register);   //done
  app.get('/fetchUsers',handlers.fetchUsers); 
  app.post('/addPatient',handlers.addPatient);
  //app.post('/fetchPatient',handlers.fetchPatient);
  app.get('/fetchPatient',handlers.fetchPatient);    //done
  app.get('/fetchSinglePatient',handlers.fetchSinglePatient);
  //app.post('/editProfile',handlers.editProfile);
  app.put('/editProfile',handlers.editProfile);
  app.get('/diseases',handlers.diseases);  //done
  app.post('/bookAppointment',handlers.bookAppointments);
  app.get('/fetchAppointment',handlers.fetchAppointment);
  app.delete('/deleteAppointment',handlers.deleteAppointment);
  app.get('/singlePatientAppointments',handlers.singlePatientAppointments);
  app.get('/getProfile',handlers.getProfile)

//   app.get('/', function(req, res) {
//     console.log(__dirname);
//   res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
// });
 // app.listen(port, () => console.log(`Server is listening on port: ${port}`)

 module.exports=app;