process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let HandlerGenerator=require('../handlers/handler.js');
let assert=require("assert");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../testserver');
let should = chai.should();
let expect = chai.expect();
let request=require('supertest');

chai.use(chaiHttp);


//.set({ 'API-Key': 'foobar', Accept: 'application/json' })

var token="novalue";
var userId="fakeId";
var patientId="fakePatientID";

describe('Preparing to test API', () => {
    /*
  * Test the /login route
  */
  describe('API testing started', () => {

      
     /*Register API testing*/


      it('it should test register API', function(done) {
  
        /*valid registration*/

        request(server)
        .post('/register')
        .send({email:'test@gmail.com',pwd:'123456789',uname:"abcd",mobile:9848012345,location:"chennai"})
        .set('Accept', 'application/json')
        .expect(function(res) {
      
        })
        .expect(200)
        .then(response => {
           response.body.should.have.property("status");
           assert(response.body.status,"success")
          done();
        }).catch(err => {
          console.log(err);
          done(new Error(err));
        })


       });
      

      it('it should test login API', function(done) {
        
       /*For Valid user*/

        request(server)
        .post('/login')
        .send({uname:'abcd',pwd:'123456789'})
        .set('Accept', 'application/json')
        .expect(function(res) {
       
        })
        .expect(200)
        .then(response => {
          response.body.should.have.property("success");
          response.body.should.have.property("message"); 
           assert(response.body.success,true);
           assert(response.body.message,"Authentication successful!"); 
           userId=mongoose.Types.ObjectId(response.body.uid);  


          done();
        }).catch(err => {
          console.log(err);
          done(new Error(err));
        })

     
       });



    /*Test addPatient API*/


     it('it should test addPatient API',function(){
  
      var formData={
        fname: "patientFirstName",
        lname: "patientLastName",
        gender:"male",
        dob: new Date(),
        mobile:9848012345,
        email:"patient@gmail.com",
        desc:"patientDesc",
        userId: userId
        };
           
          request(server)
             .post('/addPatient')
             .send(formData)
             .set('Accept','application/json')
             .expect(function(res){
               //console.log(res)
             })
             .expect(200)
             .then(response => {
              response.body.should.have.property("status");
              assert(response.body.status,"success")
               //done();
               setTimeout(function() {
                      done();  // MAGIC == EVIL.
                  }, 1000);

             }).catch(err => {
               console.log(err);
               done(new Error(err));
             })



     });





     /*editProfile*/

      it('it should test editProfile API', function(done) {

      var formdata={
        email:"test@gmail.com",
        mobile:"98487012345",
        location:"chennai",
        uid:userId
        };


        request(server)
        .put('/editProfile')
        .send(formdata)
        .set('Accept','application/json')
        .expect(function(res) {
          //console.log(res);
        })
        .expect(200)
        .then(response => {
          response.body.should.be.an("object");
          done();
        }).catch(err => {
          console.log(err);
          done(new Error(err));
        })
       
       });



      it('it should test fetchPatient API', function(done) {
        
    /*with token*/

        request(server)
        .get('/fetchPatient')
        .set('Accept','application/json')
        .expect(function(res) {
          //console.log(res);
        })
        .expect(200)
        .then(response => {
          response.body.should.be.an("array");
          patientId=mongoose.Types.ObjectId(response.body[0]['_id']);
          done();
        }).catch(err => {
          //console.log(err);
         
          done(new Error(err));
        })
       
       });

   /*It should test diseases API*/

       it('it should test diseases API', function(done) {
        
        /*with token*/

        request(server)
        .get('/diseases')
        .set('Accept','application/json')
        .expect(function(res) {
          //console.log(res);
        })
        .expect(200)
        .then(response => {
          response.body.should.be.an("array");
          done();
        }).catch(err => {
          //console.log(err);
         
          done(new Error(err));
        })
          

       })

      
    /*it should test bookAppointment API*/
      
      it('it should test bookAppointment API',function(done){
         
      var formdata={
        fname:"patientFirstName",
        lname:"patientLastName",
        disease:"flu",
        priority:"low",
        AppointmentDate:new Date(),
        patientId:patientId.toString(),
        bookingTime: new Date()
      }

      console.log(formdata);
           
        request(server)
        .post('/bookAppointment')
        .send(formdata)
        .set('Accept','application/json')
        .expect(function(res) {
          //console.log(res);
        })
        .expect(200)
        .then(response => {
          
          response.body.should.have.property("status");
            //assert(response.body.success,true);
          done();
        }).catch(err => {
          //console.log(err);
         
          done(new Error(err));
        })


      })

     /*It should test fetchAppointment API*/
     
     it('it should test fetchAppointment API',function(done){
        
       
    request(server)
    .get('/fetchAppointment')
    .set('Accept','application/json')
    .expect(function(res) {
      //console.log(res);
    })
    .expect(200)
    .then(response => {
      response.body.should.be.an("array");
      done();
    }).catch(err => {
      //console.log(err);
     
      done(new Error(err));
    })


      })


     /*It should singlePatientAppointments API*/

     it('it should test singlePatientAppointments API',function(done){

      var formdata={
        patientId:patientId
        };
         


    /*without token*/
       
    request(server)
    .get('/fetchAppointment')
    .send(formdata)
    .set('Accept','application/json')
    .expect(function(res) {
      //console.log(res);
    })
    .expect(200)
    .then(response => {
      response.body.should.be.an("array");
      done();
    }).catch(err => {
      //console.log(err);
     
      done(new Error(err));
    })


      })
    

  });

});