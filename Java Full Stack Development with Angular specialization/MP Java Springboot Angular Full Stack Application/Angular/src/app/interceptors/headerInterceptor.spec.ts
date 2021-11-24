import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../services/api.service';
import { HeaderInterceptor } from './headerInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe(`HeaderInterceptor`, () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let authToken;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
    localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6I');
    authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I'
  });

  it('should not add an Authorization header for checkLogin method', () => {
    localStorage.removeItem('token');
    service.checkLogin('test@hcs.in','Xxxxxxx1!').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/signin`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
    expect(httpRequest.request.headers.get('Authorization')).toBeNull();
  });

  it('should not add an Authorization header for regNewUser method', () => {
		const mockReqBody = {
			user_email: "hgjhg@qqu.in",
			location: "edttop",
			user_mobile: 8809871111,
			password: "Pjkhkjhjk2!",
			user_name: "usffds"		
		}
    localStorage.removeItem('token');
    service.regNewUser(mockReqBody).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/register`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
    expect(httpRequest.request.headers.get('Authorization')).toBeNull();
  });

  it('should add an Authorization header for getUserDetails method', () => {
    const userId = '7ae2548c8ad985d89f8f9532';
    service.getUserDetails(userId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/viewprofile/${userId}`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

  it('should add an Authorization header for updateDetails method', () => {
		const userId = '7ae2548c8ad985';
		const mockReqBody = {
		user_email: "aquib@abc.com",
		location: "shimla",
		user_mobile: 7576576577
		};
    service.updateDetails(userId, mockReqBody).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/editprofile/${userId}`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

  it('should add an Authorization header for registerPatient method', () => {
    const patientDetails = {
		patient_dob: "2019-08-31",
		patient_email: "abcd@def.gh",
		patient_name: "fnmae",
		patient_gender: "Male",
		patient_mobile: 9988776655,
    };
    service.registerPatient(patientDetails).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/patients/register`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

  it('should add an Authorization header for getAllPatientsList method', () => {
    service.getAllPatientsList().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/patients/list/`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

  it('should add an Authorization header for getParticularPatient method', () => {
    const patientId = '7ae2548c8ad985d89f8f9532';
    service.getParticularPatient(patientId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/patients/view/${patientId}`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

  it('should add an Authorization header for diseasesList method', () => {
    service.diseasesList().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/diseases`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

  it('should add an Authorization header for scheduleAppointment method', () => {
		const mockBookAppReq = {
		  disease: "Asthma",
		  ​patientId: "5fedcf3f-72aa-48fb-927a-492003779e07",
		  ​priority: "Normal",
		  ​tentativeDate: "2020-05-28"
		};
    service.scheduleAppointment(mockBookAppReq).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/appointment/register`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

  it('should add an Authorization header for getSinglePatientAppointments method', () => {
    const patientId = '7ae2548c8ad98jhu8sd89532';
    service.getSinglePatientAppointments(patientId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/appointment/list/${patientId}`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

  it('should add an Authorization header for deleteAppointment method', () => {
    const appointmentId = '7ae2548c8ai8g53q8sd89532';
    service.deleteAppointment(appointmentId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/appointment/delete/${appointmentId}`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

  it('should add an Authorization header for requestedAppointments method', () => {
    service.requestedAppointments().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/appointment/list`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(authToken);
  });

});