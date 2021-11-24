import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { LoginResponse } from '../models/loginResponse';


const mockLoginRes = {
  id: "d5b3464f-54bb-4692-86d1-086becf938fa",
  message: "Authentication successful!",
  success: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGhjcy5jb20iLCJuYmYiOjE1OTA1NzAxMzIsImV4cCI6MTU5MTE3NDkzMiwiaWF0IjoxNTkwNTcwMTMyfQ.5kdqQdVj"
};

const mockUserDetails = {
  id: "d5b3464f-54bb-4692-86d1-086becf938fa",
  location: "chennai",
  password: "Password1!",
  user_email: "user2@hcs.com",
  user_mobile: 9090909090,
  user_name: "User2"
};

const mockPatientDetails = [
	{
    id: "5fedcf3f-72aa-48fb-927a-492003779e07",
    patient_dob: "2020-05-14",
    patient_email: "jhjh@jkk",
    patient_gender: "Male",
    patient_mobile: 9090909090,
    patient_name: "sfsdssdds",
    registeredDate: "2020-05-27T09:10:56.3460596Z"
	},
  {
    id: "5fedcf3f-72aa-48fb-927a-492003779e07",
    patient_dob: "2020-05-14",
    patient_email: "jhjh@jkk",
    patient_gender: "Male",
    patient_mobile: 9090909090,
    patient_name: "sfsdssdds",
    registeredDate: "2020-05-27T09:10:56.3460596Z"
  }
];

const mockSinlePatientDetails = {
  id: "5fedcf3f-72aa-48fb-927a-492003779e07",
  patient_dob: "2020-05-14",
  patient_email: "jhjh@jkk",
  patient_gender: "Male",
  patient_mobile: 9090909090,
  patient_name: "sfsdssdds",
  registeredDate: "2020-05-27T09:10:56.3460596Z"
}

const mockDiseases = [
	"aches",
	"fever,pain",
	"sore throat",
	"flu",
	"common cold",
	"acid reflex",
	"constipation"
];

const mockBookAppReq = {
  disease: "Asthma",
  ​patientId: "5fedcf3f-72aa-48fb-927a-492003779e07",
  ​priority: "Normal",
  ​tentativeDate: "2020-05-28"
};

const mockAppmnt = [
	{
    bookingId: "6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f",
    ​​bookingTime: "2020-05-27T09:14:25.8977665Z",
    ​​disease: "Asthma",
    patientId: "5fedcf3f-72aa-48fb-927a-492003779e07",
    ​​priority: "Normal",
    ​tentativeDate: "2020-05-30T00:00:00"
	},
  {
    bookingId: "6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f",
    ​​bookingTime: "2020-05-27T09:14:25.8977665Z",
    ​​disease: "Asthma",
    patientId: "5fedcf3f-72aa-48fb-927a-492003779e07",
    ​​priority: "Normal",
    ​tentativeDate: "2020-05-30T00:00:00"
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
    apiService.API_URL = 'api';
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('login should send user credentials in post request body', (done) => {
    const user_name = 'jknkj@kjk';
    const password = 'Aaaaaaaaaa2!';
    const expectedRequestBody = {
      user_name: user_name,
      password: password
    };
    const requestUrl = 'api/signin';
    apiService.checkLogin(user_name, password).subscribe((response: Credentials) => {
      done();
    });

    const loginRequest = httpMock.expectOne({ method: 'POST', url: requestUrl });
    expect(loginRequest.request.body).toEqual(expectedRequestBody);
    loginRequest.flush('');

    httpMock.verify();
  });

  it('login should return user details if auth success', (done) => {
    const user_name = 'jknkj@kjk';
    const password = 'Aaaaaaaaaa2!';
    const requestUrl = 'api/signin';

    apiService.checkLogin(user_name, password).subscribe((response: LoginResponse) => {
      expect(response).toEqual(mockLoginRes);
      done();
    });

    const loginRequest = httpMock.expectOne({ method: 'POST', url: requestUrl });
    loginRequest.flush(mockLoginRes);

    httpMock.verify();
  });

  it('login should return error message if auth fails', (done) => {
    const user_name = 'jknkj@kjk';
    const password = 'Aaaaaaaaaa2!';
    const requestUrl = 'api/signin';

    apiService.checkLogin(user_name, password).subscribe(() => { }, (errorResponse: HttpErrorResponse) => {
      expect(errorResponse.error).toEqual(expectedErrorResponse);
      done();
    });

    const loginRequest = httpMock.expectOne({ method: 'POST', url: requestUrl });
    loginRequest.flush(expectedErrorResponse, { status: 401, statusText: '' });

    httpMock.verify();
  });

  it('regNewUser should return status as success if new user registered successfully', (done) => {

		const mockReqBody = {
		user_email: "hgjhg@qqu.in",
		location: "edttop",
		user_mobile: 8809871111,
		password: "Pjkhkjhjk2!",
		user_name: "usffds"		
		}
    const requestUrl = 'api/register';
    const expectedRes = {message: "Registration successful"};
    apiService.regNewUser(mockReqBody).subscribe((response) => {
      expect(response).toEqual(expectedRes);
      done();
    });

    const regNewUser = httpMock.expectOne({ method: 'POST', url: requestUrl });
    regNewUser.flush(expectedRes);

    httpMock.verify();
  });

  it('regNewUser should return status as failed if new user is not registered(email is already exists) ', (done) => {

    const mockReqBody = {
    user_email: "hgjhg@qqu.in",
    location: "edttop",
    user_mobile: 8809871111,
    password: "Pjkhkjhjk2!",
    user_name: "usffds"    
    }
    const requestUrl = 'api/register';
    const expectedRes = {message: "Password or username policy failed"};
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
    const reqURL = 'api/viewprofile/7ae2548c8ad985d89f8f9532';

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
    const reqURL = 'api/viewprofile/7ae2548c8ad985';
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

    const userId = '7ae2548c8ad985';
    const reqURL = 'api/editprofile/7ae2548c8ad985';
		const mockReqBody = {
		user_email: "aquib@abc.com",
		location: "shimla",
		user_mobile: 7576576577
		}
    apiService.updateDetails(userId, mockReqBody).subscribe(response => {
      expect(response).toEqual(mockUserDetails);
      done();
    });

    const updateDetailsRequest = httpMock.expectOne({ method: 'PUT', url: reqURL });
    expect(updateDetailsRequest.request.body).toEqual(mockReqBody);
    updateDetailsRequest.flush(mockUserDetails);

    httpMock.verify();
  });

  it('updateDetails should return status 500 if user details not updated', (done) => {

    const reqURL = 'api/editprofile/7ae2548c8ad985';
    const expectedRes = {status: "failed"};
    const userId = '7ae2548c8ad985';
    const mockReqBody = {
    user_email: "aquib@abc.com",
    location: "shimla",
    user_mobile: 7576576577
    }
    apiService.updateDetails(userId, mockReqBody).subscribe(() => { }, (errorResponse: HttpErrorResponse) => {
      expect(errorResponse.error).toEqual(expectedErrorResponse);
      done();
    });

    const updateDetailsRequest = httpMock.expectOne({ method: 'PUT', url: reqURL });
    expect(updateDetailsRequest.request.body).toEqual(mockReqBody);
    updateDetailsRequest.flush(expectedErrorResponse, { status: 500, statusText: 'false' });

    httpMock.verify();
  });

  it('registerPatient should add patient details in post request body', (done) => {

    const requestUrl = 'api/patients/register';

    const patientDetails = {
		patient_dob: "2019-08-31",
		patient_email: "abcd@def.gh",
		patient_name: "fnmae",
		patient_gender: "Male",
		patient_mobile: 9988776655,
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

    const requestUrl = 'api/patients/register';

    const patientDetails = {
    patient_dob: "2019-08-31",
    patient_email: "abcd@def.gh",
    patient_name: "fnmae",
    patient_gender: "Male",
    patient_mobile: 9988776655,
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
    const reqURL = 'api/patients/list/';
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
    const reqURL = 'api/patients/view/5d8fb22e1d9d0652ef4781ad';


    apiService.getParticularPatient(patientId).subscribe(response => {
      expect(response).toEqual(mockSinlePatientDetails);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockSinlePatientDetails);

    httpMock.verify();
  });



  it('diseasesList should return the list of diseases', (done) => {
    const reqURL = 'api/diseases';

    apiService.diseasesList().subscribe(response => {
      expect(response).toEqual(mockDiseases);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockDiseases);

    httpMock.verify();
  });

  it('scheduleAppointment should add appointment details in post request body', (done) => {

    const requestUrl = 'api/appointment/register';
    apiService.scheduleAppointment(mockBookAppReq).subscribe((response) => {
      done();
    });
    const bookAppointment = httpMock.expectOne({ method: 'POST', url: requestUrl });
    expect(bookAppointment.request.body).toEqual(mockBookAppReq);
    bookAppointment.flush('');
    httpMock.verify();
  });

  it('scheduleAppointment should return success message if POST method success', (done) => {

    const requestUrl = 'api/appointment/register';
    
    const expectedResponse = {
      message: "Registration successful"
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
    const reqURL = 'api/appointment/list/5d8e150b3768ab34dc7e607c'

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
		const reqURL = 'api/appointment/delete/5d8e150b3768ab34dc7e607c'
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
    const reqURL = 'api/appointment/list';

    apiService.requestedAppointments().subscribe(response => {
      expect(response).toEqual(mockAppmnt);
      done();
    });

    const getAllIssuesReq = httpMock.expectOne(req => req.method === 'GET' && req.url === reqURL);
    getAllIssuesReq.flush(mockAppmnt);

    httpMock.verify();
  });

});
