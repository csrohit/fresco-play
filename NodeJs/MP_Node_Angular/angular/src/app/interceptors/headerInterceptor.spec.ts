import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from '../services/api.service';
import { HeaderInterceptor } from './headerInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe(`HeaderInterceptor`, () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

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
  });

  it('should not add an authorization header for checkLogin method', () => {
    localStorage.removeItem('token');
    service.checkLogin('test','Xxxxxxx').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/login`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(false);
    expect(httpRequest.request.headers.get('authorization')).toBeNull();
  });

  it('should not add an authorization header for regNewUser method', () => {
    const mockReqBody = {
    email: "hgjhg@qqu.in",
    location: "edttop",
    mobile: "8809871111",
    pwd: "Pjkhkjhjk2!",
    uname: "usffds"    
    }
    localStorage.removeItem('token');
    service.regNewUser(mockReqBody).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/register`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(false);
    expect(httpRequest.request.headers.get('authorization')).toBeNull();
  });

  it('should add an authorization header for getUserDetails method', () => {
    const userId = '7ae2548c8ad985d89f8f9532';
    service.getUserDetails(userId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/getProfile?uid=${userId}`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

  it('should add an authorization header for updateDetails method', () => {
    const mockReqBody = {
    email: "aquib@abc.com",
    location: "shimla",
    mobile: 7576576577,
    uid: "5d89f8f95327ae2548c8ad98"  
    };
    service.updateDetails(mockReqBody).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/editProfile`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

  it('should add an authorization header for registerPatient method', () => {
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
    service.registerPatient(patientDetails).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/addPatient`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

  it('should add an authorization header for getAllPatientsList method', () => {
    service.getAllPatientsList().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/fetchPatient`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

  it('should add an authorization header for getParticularPatient method', () => {
    const patientId = '7ae2548c8ad985d89f8f9532';
    service.getParticularPatient(patientId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/fetchSinglePatient?patientId=${patientId}`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

  it('should add an authorization header for diseasesList method', () => {
    service.diseasesList().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/diseases`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

  it('should add an authorization header for scheduleAppointment method', () => {
    const mockBookAppReq = {
      disease: "sore throat",
      fname: "firstname",
      lname: "lastname",
      patientId: "5d8b0549f913d612b39aa9e4",
      priority: "Normal",
      registeredTime: new Date('2018-04-05T06:13:22.865Z'), 
      tentativeDate: "2019-10-05"
    };
    service.scheduleAppointment(mockBookAppReq).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/bookAppointment`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

  it('should add an authorization header for getSinglePatientAppointments method', () => {
    const patientId = '7ae2548c8ad98jhu8sd89532';
    service.getSinglePatientAppointments(patientId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/singlePatientAppointments?patientId=${patientId}`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

  it('should add an authorization header for deleteAppointment method', () => {
    const appointmentId = '7ae2548c8ai8g53q8sd89532';
    service.deleteAppointment(appointmentId).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/deleteAppointment?appointmentId=${appointmentId}`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

  it('should add an authorization header for requestedAppointments method', () => {
    service.requestedAppointments().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.API_URL}/fetchAppointment`);
    expect(httpRequest.request.headers.has('authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('authorization')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6I');
  });

});