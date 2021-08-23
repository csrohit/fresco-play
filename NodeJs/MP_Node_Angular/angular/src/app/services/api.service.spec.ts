import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { LoginResponse } from '../models/loginResponse';


const mockLoginRes = {
  email: "test@abc.com",
  location: "location",
  message: "Authentication successful!",
  mobile: 7576576511,
  success: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6I",
  uid: "7ae2548c8ad985d89f8f9532",
  userName: "xxxxx"
};

const mockUserDetails = {
	email: "aquib@abc.com",
	location: "shimla",
	mobile: 7576576577,
	userName: "aquib",
	_id: "5d89f8f95327ae2548c8ad98"
};

const mockPatientDetails = [
	{
	"_id": "5d8e150b3768ab34dc7e607c",
	"fname": "nelson",
	"lname": "great",
	"gender": "Male",
	"dob": "2019-09-21T00:00:00.000Z",
	"mobile": 9898999999,
	"email": "nelson@abc.in",
	"desc": "nothing",
	"userId": "5d8e0c843768ab34dc7e607a",
	"createdAt": "2019-09-27T13:56:27.448Z",
	"updatedAt": "2019-09-27T13:56:27.448Z"
	},
	{
	"_id": "5d8fb22e1d9d0652ef4781ad",
	"fname": "fnmae",
	"lname": "lname",
	"gender": "Male",
	"dob": "2019-08-31T00:00:00.000Z",
	"mobile": 9988776655,
	"email": "abcd@def.gh",
	"desc": "nothing",
	"userId": "5d89f8f95327ae2548c8ad98",
	"createdAt": "2019-09-28T19:19:10.642Z",
	"updatedAt": "2019-09-28T19:19:10.642Z"
	}
];

const mockSinlePatientDetails = {
	"_id": "5d8fb22e1d9d0652ef4781ad",
	"fname": "fnmae",
	"lname": "lname",
	"gender": "Male",
	"dob": "2019-08-31T00:00:00.000Z",
	"mobile": 9988776655,
	"email": "abcd@def.gh",
	"desc": "nothing",
	"userId": "5d89f8f95327ae2548c8ad98",
	"createdAt": "2019-09-28T19:19:10.642Z",
	"updatedAt": "2019-09-28T19:19:10.642Z"
};

const mockDiseases = [
	"aches",
	"fever,pain",
	"sore throat",
	"flu",
	"common cold",
	"acid reflex",
	"constipation",
	"abdominal pain",
	"ulcerative colitis",
	"conjuctivitis",
	"acne"
];

const mockBookAppReq = {
	disease: "sore throat",
	fname: "firstname",
	lname: "lastname",
	patientId: "5d8b0549f913d612b39aa9e4",
	priority: "Normal",
	registeredTime: new Date('2018-04-05T06:13:22.865Z'), 
	tentativeDate: "2019-10-05"
};

const mockAppmnt = [
	{
		AppointmentDate: "2019-10-03T00:00:00.000Z",
		bookingTime: "2019-09-27T10:28:55.042Z",
		disease: "acid reflex",
		fname: "firstname",
		lname: "lastname",
		patientId: "5d8e150b3768ab34dc7e607c",
		priority: "Normal",
		_id: "5d8de4671753e027ed7e5358"
	},
	{
		AppointmentDate: "2019-10-03T00:00:00.000Z",
		bookingTime: "2019-09-27T10:28:55.042Z",
		disease: "acid reflex",
		fname: "firstname",
		lname: "lastname",
		patientId: "5d8e150b3768ab34dc7e607c",
		priority: "Normal",
		_id: "5d8de4671753e027ed7e5358"
	}
];

const expectedErrorResponse = {
  message: 'Invalid username or password'
};

describe('ApiService', () => {

  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [
        HttpClientTestingModule
      ]
    });
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
    apiService.API_URL = 'http://localhost:8000';
  });

  // it('should be created', inject([ApiService], (service: ApiService) => {
  //   expect(service).toBeTruthy();
  // }));

  it('login should send user credentials in post request body', (done) => {
    const uname = 'xxxxxxx';
    const pwd = 'Aaaaaaaaaa2!';
    const expectedRequestBody = {
      uname: uname,
      pwd: pwd
    };
    const requestUrl = 'http://localhost:8000/login';
    apiService.checkLogin(uname, pwd).subscribe((response: Credentials) => {
      done();
    });

    const loginRequest = httpMock.expectOne({ method: 'POST', url: requestUrl });
    expect(loginRequest.request.body).toEqual(expectedRequestBody);
    loginRequest.flush('');

    httpMock.verify();
  });

  it('login should return user details if auth success', (done) => {
    const uname = 'xxxxxxx';
    const pwd = 'Aaaaaaaaaa2!';
    const requestUrl = 'http://localhost:8000/login';

    apiService.checkLogin(uname, pwd).subscribe((response: LoginResponse) => {
      expect(response).toEqual(mockLoginRes);
      done();
    });

    const loginRequest = httpMock.expectOne({ method: 'POST', url: requestUrl });
    loginRequest.flush(mockLoginRes);

    httpMock.verify();
  });

  it('login should return error message if auth fails', (done) => {
    const uname = 'xxxxxxx';
    const pwd = 'Bbbbbbbbbbb3!';
    const requestUrl = 'http://localhost:8000/login';

    apiService.checkLogin(uname, pwd).subscribe(() => { }, (errorResponse: HttpErrorResponse) => {
      expect(errorResponse.error).toEqual(expectedErrorResponse);
      done();
    });

    const loginRequest = httpMock.expectOne({ method: 'POST', url: requestUrl });
    loginRequest.flush(expectedErrorResponse, { status: 401, statusText: '' });

    httpMock.verify();
  });

  it('regNewUser should return status as success if new user registered successfully', (done) => {

		const mockReqBody = {
		email: "hgjhg@qqu.in",
		location: "edttop",
		mobile: "8809871111",
		pwd: "Pjkhkjhjk2!",
		uname: "usffds"		
		}
    const requestUrl = 'http://localhost:8000/register';
    const expectedRes = {status: "success"};

    apiService.regNewUser(mockReqBody).subscribe((response) => {
      expect(response).toEqual(expectedRes);
      done();
    });

    const regNewUser = httpMock.expectOne({ method: 'POST', url: requestUrl });
    regNewUser.flush(expectedRes);

    httpMock.verify();
  });

  it('regNewUser should return status as failed if new user is not registered(username or email is already exists) ', (done) => {

		const mockReqBody = {
		email: "hgjhg@qqu.in",
		location: "edttop",
		mobile: "8809871111",
		pwd: "Pjkhkjhjk2!",
		uname: "usffds"		
		};
    const requestUrl = 'http://localhost:8000/register';
    const expectedRes = {status: "failed"};

    apiService.regNewUser(mockReqBody).subscribe(() => { }, (errorResponse: HttpErrorResponse) => {
      expect(errorResponse.error).toEqual(expectedErrorResponse);
      done();
    });

    const regNewUser = httpMock.expectOne({ method: 'POST', url: requestUrl });
    regNewUser.flush(expectedErrorResponse, { status: 422, statusText: 'failed' });

    httpMock.verify();
  });

  it('getUserDetails should return user details', (done) => {
    const userId = '7ae2548c8ad985d89f8f9532';
    const reqURL = 'http://localhost:8000/getProfile?uid=7ae2548c8ad985d89f8f9532';

    apiService.getUserDetails(userId).subscribe(response => {
      expect(response).toEqual(mockUserDetails);
      done();
    });

    const getUserDetailsReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getUserDetailsReq.flush(mockUserDetails);

    httpMock.verify();
  });

  it('getUserDetails should return false status if userId is not valid', (done) => {

    const userId = '7ae2548c8ad985';
    const reqURL = 'http://localhost:8000/getProfile?uid=7ae2548c8ad985';
    const expectedRes = {status: "false"};

    apiService.getUserDetails(userId).subscribe(() => { }, (errorResponse: HttpErrorResponse) => {
      expect(errorResponse.error).toEqual(expectedErrorResponse);
      done();
    });

    const regNewUser = httpMock.expectOne({ method: 'Get', url: reqURL });
    regNewUser.flush(expectedErrorResponse, { status: 500, statusText: 'false' });

    httpMock.verify();
  });

  it('updateDetails should return new user details after submitting the update', (done) => {

    const reqURL = 'http://localhost:8000/editProfile';
		const mockReqBody = {
		email: "aquib@abc.com",
		location: "shimla",
		mobile: 7576576577,
		uid: "5d89f8f95327ae2548c8ad98"	
		}
    apiService.updateDetails(mockReqBody).subscribe(response => {
      expect(response).toEqual(mockUserDetails);
      done();
    });

    const updateDetailsRequest = httpMock.expectOne({ method: 'PUT', url: reqURL });
    expect(updateDetailsRequest.request.body).toEqual(mockReqBody);
    updateDetailsRequest.flush(mockUserDetails);

    httpMock.verify();
  });

  it('updateDetails should return status 500 if user details not updated', (done) => {

    const reqURL = 'http://localhost:8000/editProfile';
    const expectedRes = {status: "failed"};
		const mockReqBody = {
		email: "aquib@abc.com",
		location: "shimla",
		mobile: 7576576577,
		uid: "5d89f8f95327ae2548c8ad98"	
		}
    apiService.updateDetails(mockReqBody).subscribe(() => { }, (errorResponse: HttpErrorResponse) => {
      expect(errorResponse.error).toEqual(expectedErrorResponse);
      done();
    });

    const updateDetailsRequest = httpMock.expectOne({ method: 'PUT', url: reqURL });
    expect(updateDetailsRequest.request.body).toEqual(mockReqBody);
    updateDetailsRequest.flush(expectedErrorResponse, { status: 500, statusText: 'false' });

    httpMock.verify();
  });

  it('registerPatient should add patient details in post request body', (done) => {

    const requestUrl = 'http://localhost:8000/addPatient';

    const patientDetails = {
		desc: "nothing",
		dob: "2019-08-31",
		email: "abcd@def.gh",
		fname: "fnmae",
		gender: "Male",
		lname: "lname",
		mobile: "9988776655",
		userId: "5d89f8f95327ae2548c8ad98"
    };
    
    const expectedRequestBody = {
    	status: "success"
    };

    apiService.registerPatient(patientDetails).subscribe((response) => {
      done();
    });
    const registerPatient = httpMock.expectOne({ method: 'POST', url: requestUrl });
    expect(registerPatient.request.body).toEqual(patientDetails);
    registerPatient.flush('');
    httpMock.verify();
  });

  it('registerPatient should return success if POST method success', (done) => {

    const requestUrl = 'http://localhost:8000/addPatient';

    const patientDetails = {
		desc: "nothing",
		dob: "2019-08-31",
		email: "abcd@def.gh",
		fname: "fnmae",
		gender: "Male",
		lname: "lname",
		mobile: "9988776655",
		userId: "5d89f8f95327ae2548c8ad98"
    };
    
    const expectedRequestBody = {
    	status: "success"
    };
    
    apiService.registerPatient(patientDetails).subscribe(response => {
      expect(response).toEqual(expectedRequestBody);
      done();
    });
    const registerPatient = httpMock.expectOne({ method: 'POST', url: requestUrl });
    registerPatient.flush(expectedRequestBody);
    httpMock.verify();
  });

  it('getAllPatientsList should return all patient details', (done) => {
    const reqURL = 'http://localhost:8000/fetchPatient';
    apiService.getAllPatientsList().subscribe(response => {
      expect(response).toEqual(mockPatientDetails);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockPatientDetails);

    httpMock.verify();
  });

  it('getParticularPatient should return particular patient details', (done) => {
    const patientId = '5d8fb22e1d9d0652ef4781ad';
    const reqURL = 'http://localhost:8000/fetchSinglePatient?patientId=5d8fb22e1d9d0652ef4781ad';


    apiService.getParticularPatient(patientId).subscribe(response => {
      expect(response).toEqual(mockSinlePatientDetails);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockSinlePatientDetails);

    httpMock.verify();
  });



  it('diseasesList should return the list of diseases', (done) => {
    const reqURL = 'http://localhost:8000/diseases';

    apiService.diseasesList().subscribe(response => {
      expect(response).toEqual(mockDiseases);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockDiseases);

    httpMock.verify();
  });

  it('scheduleAppointment should add appointment details in post request body', (done) => {

    const requestUrl = 'http://localhost:8000/bookAppointment';

    apiService.scheduleAppointment(mockBookAppReq).subscribe((response) => {
      done();
    });
    const bookAppointment = httpMock.expectOne({ method: 'POST', url: requestUrl });
    expect(bookAppointment.request.body).toEqual(mockBookAppReq);
    bookAppointment.flush('');
    httpMock.verify();
  });

  it('scheduleAppointment should return success message if POST method success', (done) => {

    const requestUrl = 'http://localhost:8000/bookAppointment';

    const expectedResponse = {
    	status: "success"
    };
    
    apiService.scheduleAppointment(mockBookAppReq).subscribe(response => {
      expect(response).toEqual(expectedResponse);
      done();
    });
    const bookAppointment = httpMock.expectOne({ method: 'POST', url: requestUrl });
    bookAppointment.flush(expectedResponse);
    httpMock.verify();
  });

  it('getSinglePatientAppointments should return requested appointments of particular patient', (done) => {
    const patientId = '5d8e150b3768ab34dc7e607c';
    const reqURL = 'http://localhost:8000/singlePatientAppointments?patientId=5d8e150b3768ab34dc7e607c'

    apiService.getSinglePatientAppointments(patientId).subscribe(response => {
      expect(response).toEqual(mockAppmnt);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockAppmnt);

    httpMock.verify();
  });

  it('deleteAppointment should return success status if appointment deleted', (done) => {
    const patientId = '5d8e150b3768ab34dc7e607c';
		const reqURL = 'http://localhost:8000/deleteAppointment?appointmentId=5d8e150b3768ab34dc7e607c'
    const expectedRequestBody = {
    	status: "success"
    };

    apiService.deleteAppointment(patientId).subscribe(response => {
      expect(response).toEqual(expectedRequestBody);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'DELETE' && req.url === reqURL);
    getAllIssuesReq.flush(expectedRequestBody);

    httpMock.verify();
  });

  it('requestedAppointments should return all appointments requested by all patients', (done) => {
    const reqURL = 'http://localhost:8000/fetchAppointment';

    apiService.requestedAppointments().subscribe(response => {
      expect(response).toEqual(mockAppmnt);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockAppmnt);

    httpMock.verify();
  });

});
