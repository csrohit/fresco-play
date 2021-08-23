import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Response, ResponseOptions, ResponseType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { ApiService } from './api.service';
import { DataService} from './data.service';


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
  _id: "7ae2548c8ad985d89f8f9532"
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

const expectedRes = {status: "success"};

const expectedErrorResponse = {
  status: 404,
  message: 'Not found'
};

const errorResponse = new HttpErrorResponse({
  error: 'test 401 error',
  status: 401, statusText: 'Invalid username or password'
});

class MockApiService {

  public checkLogin(username: string, password: string): Observable<any> {
    return of(mockLoginRes);
  }
  // public checkLogin(username: string, password: string): Observable<Credentials> {
  //   return of(new Credentials);
  // }

  public regNewUser(regNewUser): Observable<any> {
    return of(expectedRes);
  }

  public getUserDetails(userId: string): Observable<any> {
    return of(mockUserDetails);
  }

  public updateDetails(userDetails): Observable<any> {
    return of(mockUserDetails);
  }

  public registerPatient(patientDetails): Observable<any> {
    return of(expectedRes);
  }

  public getAllPatientsList(): Observable<any> {
  	return of(mockPatientDetails);
  }

  public getParticularPatient(patientId): Observable<any> {
	return of(mockSinlePatientDetails);
  }

  public diseasesList(): Observable<any> {
  	return of(mockDiseases);
  }

  public scheduleAppointment(appointmentDetails: any) {
  	return of(expectedRes);
  }

  public getSinglePatientAppointments(patientId): Observable<any> {
  	return of(mockAppmnt);
  }

  public deleteAppointment(appointmentId) {
  	return of(expectedRes);
  }

  public requestedAppointments(): Observable<any> {
  	return of(mockAppmnt);
  }
}

describe('DataService', () => {

  let dataService: DataService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        { provide: ApiService, useClass: MockApiService },
        HttpClient,
        HttpHandler,
      ]
    });
    dataService = TestBed.get(DataService);
    apiService = TestBed.get(ApiService);

  });
  afterEach(() => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
  });


  it('authenticateUser should return true if auth success', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.callThrough();
    tick();
    dataService.authenticateUser('xxxxx', 'Aaaaaaaaaa2!').subscribe((res) => {
      expect(res).toBe(true);
    });
  }));

  it('authenticateUser should store uid, token in localStorage if auth success', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.callThrough();
    tick();
    dataService.authenticateUser('xxxxx', 'Aaaaaaaaaa2!').subscribe((res) => {
      expect(res).toBe(true);
    });
    tick();
    expect(localStorage.getItem('uid')).toEqual('7ae2548c8ad985d89f8f9532');
    expect(localStorage.getItem('token')).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6I');

  }));


  it('authenticateUser should return false on occurence of error', fakeAsync(() => {
    const spy = spyOn(apiService, 'checkLogin').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.authenticateUser('user','Passwddd4!').subscribe((res) => {
      expect(res).toBeFalsy();
    },
      (err) => {
        tick();
        expect(err).toBeDefined();

      });
  }));

  it('getAuthStatus should return true for valid users for checking auth status', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.callThrough();
    tick();
    dataService.authenticateUser('test', 'password').subscribe((res) => {
      dataService.getAuthStatus().subscribe((response) => {
        expect(response).toBeTruthy();
      });
    });

  }));

  it('getAuthStatus should return false for invalid users for checking auth status', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.authenticateUser('test', 'password').subscribe((res) => {
      dataService.getAuthStatus().subscribe((response) => {
        expect(response).toBeFalsy();
      });
    });
  }));


  it('regNewUser should return success status if user added successfully', fakeAsync(() => {

    const mockReqBody = {
    email: "hgjhg@qqu.in",
    location: "edttop",
    mobile: "8809871111",
    pwd: "Pjkhkjhjk2!",
    uname: "usffds"    
    };

    spyOn(apiService, 'regNewUser').and.callThrough();
    tick();
    dataService.regNewUser(mockReqBody).subscribe((res) => {
      expect(res).toBe(expectedRes)
    },
      (error) => {
        expect(error).toBeUndefined();
      });

  }));

  it('regNewUser status as failed if new user is not registered(username or email is already exists)', fakeAsync(() => {

    const mockReqBody = {
    email: "hgjhg@qqu.in",
    location: "edttop",
    mobile: "8809871111",
    pwd: "Pjkhkjhjk2!",
    uname: "usffds"    
    };

    spyOn(apiService, 'regNewUser').and.returnValue(Observable.throw({ status: 422, statusText: 'failed' }));
    tick();
    dataService.regNewUser(mockReqBody).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('doLogOut should store clear localStorage', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.callThrough();
    tick();
    dataService.authenticateUser('xxxxx', 'Aaaaaaaaaa2!').subscribe((res) => {
    });
    tick();
    dataService.doLogOut();
    expect(localStorage.getItem('userId')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  }));


  it('getUserDetails should return user details on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.callThrough();
    spyOn(apiService, 'getUserDetails').and.callThrough();
    tick();
    dataService.authenticateUser('xxxxx', 'Aaaaaaaaaa2!').subscribe((res) => {
      // expect(res).toBe(true);
    });
    tick();
    dataService.getUserDetails().subscribe((res) => {
      expect(res).toBe(mockUserDetails);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
    expect(apiService.getUserDetails).toHaveBeenCalledWith('7ae2548c8ad985d89f8f9532');
  }));

  it('getUserDetails should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'getUserDetails').and.returnValue(Observable.throw(errorResponse));
    dataService.getUserDetails().subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));


  it('updateProfile should return true on providing valid user details', fakeAsync(() => {
    const mockReqBody = {
    email: "aquib@abc.com",
    location: "shimla",
    mobile: 7576576577,
    uid: "5d89f8f95327ae2548c8ad98"  
    }

    spyOn(apiService, 'updateDetails').and.callThrough();
    tick();
    dataService.updateProfile(mockReqBody).subscribe((res) => {
      expect(res).toBeTruthy();
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('updateProfile should return false on occurence of error', fakeAsync(() => {
    const mockReqBody = {
    email: "aquib@abc.com",
    location: "shimla",
    mobile: 7576576577,
    uid: "5d89f8f95327ae2548c8ad98"  
    }

    spyOn(apiService, 'updateDetails').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.updateProfile(mockReqBody).subscribe((res) => {
      expect(res).toBeFalsy();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('registerPatient should return patientDetails  on reporting with valid user id ', fakeAsync(() => {
    
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

    spyOn(apiService, 'registerPatient').and.callThrough();
    tick();
    dataService.registerPatient(patientDetails).subscribe((res) => {
      expect(res).toBe(expectedRes);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('registerPatient should return error on occurence of error ', fakeAsync(() => {

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

    spyOn(apiService, 'registerPatient').and.returnValue(Observable.throw(errorResponse));
    dataService.registerPatient(patientDetails).subscribe((res) => {
      expect(res.id).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('getAllPatientsList should return user details on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'getAllPatientsList').and.callThrough();
    tick();
    dataService.getAllPatientsList().subscribe((res) => {
      expect(res).toBe(mockPatientDetails);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('getAllPatientsList should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'getAllPatientsList').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.getAllPatientsList().subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('getParticularPatient should return patient details on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'getParticularPatient').and.callThrough();
    tick();
    dataService.getParticularPatient('sfss8798ss').subscribe((res) => {
      expect(res).toBe(mockSinlePatientDetails);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('getParticularPatient should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'getParticularPatient').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.getParticularPatient('sfss8798ss').subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('diseasesList should return list of diseases', fakeAsync(() => {
    spyOn(apiService, 'diseasesList').and.callThrough();
    tick();
    dataService.diseasesList().subscribe((res) => {
      expect(res).toBe(mockDiseases);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('diseasesList should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'diseasesList').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.diseasesList().subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('scheduleAppointment should return success status on reporting with valid appointmentDetails ', fakeAsync(() => {
    spyOn(apiService, 'scheduleAppointment').and.callThrough();
    tick();
    dataService.scheduleAppointment(mockBookAppReq).subscribe((res) => {
      expect(res).toBe(expectedRes);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('scheduleAppointment should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'scheduleAppointment').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.scheduleAppointment(mockBookAppReq).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('getSinglePatientAppointments should return appointment details on providing valid appointment id', fakeAsync(() => {
    const patientId = '5d8de4671753e027ed7e5358';
    spyOn(apiService, 'getSinglePatientAppointments').and.callThrough();
    tick();
    dataService.getSinglePatientAppointments(patientId).subscribe((res) => {
      expect(res).toBe(mockAppmnt);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('getSinglePatientAppointments should return error on occurence of error', fakeAsync(() => {
    const patientId = '5d8de4671753e027ed7e5358';
    spyOn(apiService, 'getSinglePatientAppointments').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.getSinglePatientAppointments(patientId).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('deleteAppointment should return success status on providing valid appointment id', fakeAsync(() => {
    const patientId = '5d8de4671753e027ed7e5358';
    spyOn(apiService, 'deleteAppointment').and.callThrough()
    tick();
    dataService.deleteAppointment(patientId).subscribe((res) => {
      expect(res).toBe(expectedRes);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('deleteAppointment should return error on occurence of error', fakeAsync(() => {
    const patientId = '5d8de4671753e027ed7e5358';
    spyOn(apiService, 'deleteAppointment').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.deleteAppointment(patientId).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('requestedAppointments should return all appointments booked by all patients', fakeAsync(() => {
    spyOn(apiService, 'requestedAppointments').and.callThrough();
    tick();
    dataService.requestedAppointments().subscribe((res) => {
      expect(res).toBe(mockAppmnt);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('requestedAppointments should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'requestedAppointments').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.requestedAppointments().subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));



});