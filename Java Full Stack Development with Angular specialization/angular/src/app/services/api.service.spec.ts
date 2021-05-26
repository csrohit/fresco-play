import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';

const API_URL = 'api';
const AUTH_API_URL = API_URL + '/auth/server/';

const user: Users = new Users();
user.username = 'loggeduser';
user.mobile = '1234567890';
user.location = 'Location';
user.email = 'mail@mail.com';
user.userId = 1;

describe('ApiService', () => {

  let apiService: ApiService;
  let httpMock: HttpTestingController;
  const _baseUrl = AUTH_API_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [
        HttpClientTestingModule
      ]
    });
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  // it('should be created', inject([ApiService], (service: ApiService) => {
  //   expect(service).toBeTruthy();
  // }));

  it('login should send user credentials in post request body', (done) => {
    const username = 'username';
    const password = 'password';
    const expectedRequestBody = {
      username: username,
      password: password
    };

    apiService.checkLogin(username, password).subscribe((response: Credentials) => {
      done();
    });

    const loginRequest = httpMock.expectOne({ method: 'POST', url: _baseUrl });
    expect(loginRequest.request.body).toEqual(expectedRequestBody);
    loginRequest.flush('');

    httpMock.verify();
  });

  it('login should return user details if auth success', (done) => {
    const username = 'username';
    const password = 'password';
    const userId = 1;
    const expectedResponse = new Credentials();
    expectedResponse.userId = userId;

    apiService.checkLogin(username, password).subscribe((response: Credentials) => {
      expect(response.userId).toEqual(expectedResponse.userId);
      done();
    });

    const loginRequest = httpMock.expectOne({ method: 'POST', url: _baseUrl });
    loginRequest.flush(expectedResponse);

    httpMock.verify();
  });

  it('login should return error message if auth fails', (done) => {
    const username = 'username';
    const password = 'password';
    const expectedErrorResponse = {
      message: 'Invalid username or password'
    };

    apiService.checkLogin(username, password).subscribe(() => { }, (errorResponse: HttpErrorResponse) => {
      expect(errorResponse.error).toEqual(expectedErrorResponse);
      done();
    });

    const loginRequest = httpMock.expectOne({ method: 'POST', url: _baseUrl });
    loginRequest.flush(expectedErrorResponse, { status: 401, statusText: '' });

    httpMock.verify();
  });

  it('getUserDetails should return user details', (done) => {
    const userId = 1;
    const reqURL = API_URL + '/users/' + userId;
    apiService.getUserDetails(userId).subscribe(response => {
      expect(response).toEqual(user);
      expect(response.username).toEqual('loggeduser');
      expect(response.location).toEqual('Location');
      expect(response.email).toEqual('mail@mail.com');
      done();
    });

    const getUserDetailsReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getUserDetailsReq.flush(user);

    httpMock.verify();
  });

  it('updateDetails should return new user details after submitting the update', (done) => {

    const requestUrl = API_URL + '/users/' + user.userId;

    apiService.updateDetails(user).subscribe(response => {
      expect(response).toEqual(user);
      done();
    });

    const updateDetailsRequest = httpMock.expectOne({ method: 'PUT', url: requestUrl });
    expect(updateDetailsRequest.request.body).toEqual(user);
    updateDetailsRequest.flush(user);

    httpMock.verify();
  });


  it('registerPatient should add patient details in post request body', (done) => {

    const requestUrl = API_URL + '/allpatients';

    const patientDetails = {
    	name: 'name',
    	mobile: 9876543210
    };
    
    const expectedRequestBody = {
    	name: 'name',
    	mobile: 9876543210
    };

    apiService.registerPatient(patientDetails).subscribe((response) => {
      done();
    });
    const registerPatient = httpMock.expectOne({ method: 'POST', url: requestUrl });
    expect(registerPatient.request.body).toEqual(expectedRequestBody);
    registerPatient.flush('');
    httpMock.verify();
  });

  it('registerPatient should return patient details if POST method success', (done) => {

    const requestUrl = API_URL + '/allpatients';

    const patientDetails = {
      name: 'name',
      mobile: 9876543210
    };
    
    const expectedResponse = {
      name: 'name',
      mobile: 9876543210
    };
    
    apiService.registerPatient(patientDetails).subscribe(response => {
      expect(response).toEqual(expectedResponse);
      done();
    });
    const registerPatient = httpMock.expectOne({ method: 'POST', url: requestUrl });
    registerPatient.flush(expectedResponse);
    httpMock.verify();
  });


  it('getParticularPatient should return particular patient details', (done) => {
    const id = 1;
    const reqURL = API_URL + '/allpatients/' + id;

    const patientDetails = {
      firstName: "dinakaran", 
      lastName: "narayanan", 
      gender: "Male", dob: "2019-09-13",
      mobile: "4466162463"
    };

    const mockResponse = [
      {firstName: "dinakaran", lastName: "narayanan", gender: "Male", dob: "2019-09-13", mobile: "4466162463"},
      {firstName: "vignesh", lastName: "kumar", gender: "Male", dob: "2019-09-12", mobile: "6666666666"},
      {firstName: "robin", lastName: "singh", gender: "Male", dob: "2019-09-13", mobile: "9876543111"}
    ];
    apiService.getParticularPatient(id).subscribe(response => {
      expect(response).toEqual(patientDetails);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(patientDetails);

    httpMock.verify();
  });

  it('getAllPatientsList should return all patient details', (done) => {
    const reqURL = API_URL + '/allpatients';
    const mockResponse = [
      {firstName: "dinakaran", lastName: "narayanan", gender: "Male", dob: "2019-09-13", mobile: "4466162463"},
      {firstName: "vignesh", lastName: "kumar", gender: "Male", dob: "2019-09-12", mobile: "6666666666"},
      {firstName: "robin", lastName: "singh", gender: "Male", dob: "2019-09-13", mobile: "9876543111"}
    ];
    apiService.getAllPatientsList().subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockResponse);

    httpMock.verify();
  });

  it('getDiseasesList should return disease list', (done) => {
    const reqURL = API_URL + '/diseases';
    const mockResponse = [
      {name: "Adenovirus Infection"},
      {name: "Asthma"},
      {name: "Bird Flu"},
      {name: "Cancer"}
    ];
    apiService.getDiseasesList().subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockResponse);

    httpMock.verify();
  });

  it('bookAppointment should add appointment details in post request body', (done) => {

    const requestUrl = API_URL + '/reqappointments';

    const appointmentDetails = {
      patientId: 1,
      patientFirstName: "check1",
      patientLastName: "ckeck2",
      disease: "Asthma",
      priority: "Normal"
    };

    apiService.bookAppointment(appointmentDetails).subscribe((response) => {
      done();
    });
    const bookAppointment = httpMock.expectOne({ method: 'POST', url: requestUrl });
    expect(bookAppointment.request.body).toEqual(appointmentDetails);
    bookAppointment.flush('');
    httpMock.verify();
  });

  it('bookAppointment should return patient details if POST method success', (done) => {

    const requestUrl = API_URL + '/reqappointments';

    const appointmentDetails = {
      patientId: 1,
      patientFirstName: "check1",
      patientLastName: "ckeck2",
      disease: "Asthma",
      priority: "Normal"
    };
    
    apiService.bookAppointment(appointmentDetails).subscribe(response => {
      expect(response).toEqual(appointmentDetails);
      done();
    });
    const bookAppointment = httpMock.expectOne({ method: 'POST', url: requestUrl });
    bookAppointment.flush(appointmentDetails);
    httpMock.verify();
  });

  it('getAppointments should return requested appointments of particular patient', (done) => {
    const id = 1;
    const reqURL = API_URL + '/reqappointments?patientId=' + id;

    const mockResponse = [
      {firstName: "dinakaran", lastName: "narayanan", gender: "Male", tentativedate: "2019-09-13"},
      {firstName: "dinakaran", lastName: "narayanan", gender: "Male", tentativedate: "2019-09-13"},
      {firstName: "dinakaran", lastName: "narayanan", gender: "Male", tentativedate: "2019-09-13"}
    ];
    apiService.getAppointments(id).subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockResponse);

    httpMock.verify();
  });

  it('deleteAppointment returns empty response', (done) => {
    const id = 7;
    const reqURL = API_URL + '/reqappointments/' + id;

    const mockResponse = {};
    apiService.deleteAppointment(id).subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'DELETE' && req.url === reqURL);
    getAllIssuesReq.flush(mockResponse);

    httpMock.verify();
  });

  it('requestedAppointments should return all appointments requested by all patients', (done) => {
    const reqURL = API_URL + '/reqappointments';

    const mockResponse = [
      {firstName: "dinakaran", lastName: "narayanan", gender: "Male", tentativedate: "2019-09-13"},
      {firstName: "abc", lastName: "ghi", gender: "Male", tentativedate: "2019-09-15"},
      {firstName: "def", lastName: "jkl", gender: "Female", tentativedate: "2019-09-19"}
    ];
    apiService.requestedAppointments().subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockResponse);

    httpMock.verify();
  });

});
