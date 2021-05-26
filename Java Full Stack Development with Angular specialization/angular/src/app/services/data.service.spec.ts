import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Response, ResponseOptions, ResponseType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { ApiService } from './api.service';
import { DataService} from './data.service';

const patientDetails = {
  'patientId': 20,
  'patientname': 'test',
  'mobile': 1234567890,
  'status': 'requested',
  'reportedTime': new Date('2018-04-06T04:52:18.437Z'),
};
const id = 1;
const patientList = [patientDetails];
const mockUser = new Credentials();
mockUser.username = 'test';
mockUser.password = 'password';
mockUser.userId = 1;
const user = new Users();
user.username = 'test';
user.mobile = '1234567890';
user.location = 'testLocation';
user.email = 'test@test.com';
user.userId = 1;

const diseasesList = [
  {name: "Adenovirus Infection"},
  {name: "Asthma"},
  {name: "Bird Flu"},
  {name: "Cancer"}
];
const deleteResponse = {};

const errorResponse = new HttpErrorResponse({
  error: 'test 404 error',
  status: 404, statusText: 'Not Found'
});

class MockApiService {
  public checkLogin(username: string, password: string): Observable<Credentials> {
    return of(new Credentials);
  }

  public getUserDetails(userId: number): Observable<Users> {
    return of(new Users);
  }

  public updateDetails(userDetails: Users): Observable<Users> {
    return of(new Users);
  }

  public registerPatient(patientDetails): Observable<any> {
    return of(patientDetails);
  }

  public getAllPatientsList(): Observable<any> {
  	return of(patientList);
  }

  public getParticularPatient(id): Observable<any> {
	return of(patientDetails);
  }

  public getDiseasesList(): Observable<any> {
  	return of(diseasesList);
  }

  public bookAppointment(appointmentDetails: any) {
  	return of(patientDetails);
  }

  public getAppointments(userId): Observable<any> {
  	return of(patientList);
  }

  public deleteAppointment(appointmentId) {
  	return of(deleteResponse);
  }

  public requestedAppointments(): Observable<any> {
  	return of(patientList);
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
    localStorage.removeItem('userId');
  });

  it(' should return false after creation', () => {
    dataService.getAuthStatus().subscribe((res) => {
      expect(res).toBeFalsy();
    });

  });

  it('#dologin should return isLogin as false on click logout', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.returnValue(of(mockUser));
    tick();
    dataService.authenticateUser('test', 'password').subscribe((res) => {
      expect(res).toBeTruthy();
    });
    tick();
    expect(dataService.isLogIn.value).toBeTruthy();
    expect(localStorage.getItem('userId')).toEqual('1');

    dataService.doLogOut();
    expect(localStorage.getItem('userId')).toBeNull();
    expect(dataService.isLogIn.value).toBeFalsy();
  }));

  it(' should return true on logging in with right credentials', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.returnValue(of(mockUser));
    tick();
    dataService.authenticateUser('test', 'password').subscribe((res) => {
      expect(res).toBeTruthy();
    });
  }));

  it(' should return 1 from local storage if exists and isLogin is true', fakeAsync(() => {
    localStorage.setItem('userId', '1');
    tick();
    dataService.isLogIn.next(true);
    expect(dataService.getUserId()).toBe(1);
  }));

  it(' should return -1 userId from local storage if exists but isLogin is false', fakeAsync(() => {
    localStorage.setItem('userId', '1');
    tick();
    dataService.isLogIn.next(false);
    expect(dataService.getUserId()).toBe(-1);
  }));

  it(' should return -1 userId from local storage if exists but isLogin is false', fakeAsync(() => {
    localStorage.setItem('userId', '1');
    tick();
    dataService.isLogIn.next(false);
    expect(dataService.getUserId()).toBe(-1);
  }));

  it(' should return -1 if user is no logged in or userid not exists in localstorage', fakeAsync(() => {
    dataService.isLogIn.next(true);
    expect(dataService.getUserId()).toBe(-1);
    dataService.isLogIn.next(false);
    expect(dataService.getUserId()).toBe(-1);
  }));

  it(' should return -1 if user is no logged in or userid in localstorage is invalid', fakeAsync(() => {
    localStorage.setItem('userId', '-1');
    tick();
    dataService.isLogIn.next(false);
    expect(dataService.getUserId()).toBe(-1);
  }));

  it(' should return -1 if user is no logged in or userid in localstorage is invalid', fakeAsync(() => {
    localStorage.setItem('userId', '-1');
    tick();
    dataService.isLogIn.next(true);
    expect(dataService.getUserId()).toBe(-1);
  }));


  it(' should return false on logging in with invalid  credentials', fakeAsync(() => {
    dataService.authenticateUser('test', 'password').subscribe((res) => {
      expect(res).toBeFalsy();
    });
  }));

  it('#getAuthStatus should return true for valid users for checking auth status', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.returnValue(of(mockUser));
    tick();
    dataService.authenticateUser('test', 'password').subscribe((res) => {
      dataService.getAuthStatus().subscribe((response) => {
        expect(response).toBeTruthy();
      });
    });

  }));

  it('#getAuthStatus should return false for invalid users for checking auth status', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.returnValue(of(new Credentials));
    tick();
    dataService.authenticateUser('test', 'password').subscribe((res) => {
      dataService.getAuthStatus().subscribe((response) => {
        expect(response).toBeFalsy();
      });
    });
  }));

  it('#getUserDetails should return user details on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'getUserDetails').and.returnValue(of(user));
    tick();
    dataService.getUserDetails(1).subscribe((res) => {
      expect(res.userId).toBe(1);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#getUserDetails should return error on providing invalid user id', fakeAsync(() => {
    dataService.getUserDetails(1).subscribe((res) => {
      expect(res.userId).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#getUserDetails should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'getUserDetails').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.getUserDetails(1).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#updateProfile should return true on providing valid user details', fakeAsync(() => {
    spyOn(apiService, 'updateDetails').and.returnValue(of(user));
    tick();
    dataService.updateProfile(user).subscribe((res) => {
      expect(res).toBeTruthy();
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#updateProfile should return false on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'updateDetails').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.updateProfile(user).subscribe((res) => {
      expect(res).toBeFalsy();
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#registerPatient should return patientDetails  on reporting with valid user id ', fakeAsync(() => {
    spyOn(apiService, 'registerPatient').and.returnValue(of(patientDetails));
    tick();
    dataService.registerPatient(patientDetails).subscribe((res) => {
      expect(res.patientId).toBe(patientDetails.patientId);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#registerPatient should return null on reporting with invalid id ', fakeAsync(() => {
    dataService.registerPatient(patientDetails).subscribe((res) => {
      expect(res.id).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#registerPatient should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'registerPatient').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.registerPatient(patientDetails).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#getAllPatientsList should return user details on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'getAllPatientsList').and.returnValue(of(patientList));
    tick();
    dataService.getAllPatientsList().subscribe((res) => {
      expect(res).toBe(patientList);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#getAllPatientsList should return error on providing invalid user id', fakeAsync(() => {
    dataService.getAllPatientsList().subscribe((res) => {
      expect(res.patientId).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#getAllPatientsList should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'getAllPatientsList').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.getAllPatientsList().subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#getParticularPatient should return patient details on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'getParticularPatient').and.returnValue(of(patientDetails));
    tick();
    dataService.getParticularPatient(id).subscribe((res) => {
      expect(res.mobile).toBe(1234567890);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#getParticularPatient should return error on providing invalid user id', fakeAsync(() => {
    dataService.getParticularPatient(id).subscribe((res) => {
      expect(res.userId).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#getParticularPatient should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'getParticularPatient').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.getParticularPatient(id).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#getDiseasesList should return list on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'getDiseasesList').and.returnValue(of(diseasesList));
    tick();
    dataService.getDiseasesList().subscribe((res) => {
      expect(res).toBe(diseasesList);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#getDiseasesList should return error on providing invalid user id', fakeAsync(() => {
    dataService.getDiseasesList().subscribe((res) => {
      expect(res.userId).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#getDiseasesList should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'getDiseasesList').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.getDiseasesList().subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#bookAppointment should return appointmentDetails  on reporting with valid user id ', fakeAsync(() => {
    spyOn(apiService, 'bookAppointment').and.returnValue(of(patientDetails));
    tick();
    dataService.bookAppointment(patientDetails).subscribe((res) => {
      expect(res.patientId).toBe(patientDetails.patientId);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#bookAppointment should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'bookAppointment').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.bookAppointment(patientDetails).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#getAppointments should return appointment details on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'getAppointments').and.returnValue(of(patientList));
    tick();
    dataService.getAppointments(id).subscribe((res) => {
      expect(res).toBe(patientList);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#getAppointments should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'getAppointments').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.getAppointments(id).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#deleteAppointment should return empty object on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'deleteAppointment').and.returnValue(of(deleteResponse));
    tick();
    dataService.deleteAppointment(id).subscribe((res) => {
      expect(res).toBe(deleteResponse);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#deleteAppointment should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'deleteAppointment').and.returnValue(Observable.throw(errorResponse));
    tick();
    dataService.deleteAppointment(id).subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('#requestedAppointments should return appointments on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'requestedAppointments').and.returnValue(of(patientList));
    tick();
    dataService.requestedAppointments().subscribe((res) => {
      expect(res).toBe(patientList);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('#requestedAppointments should return error on occurence of error', fakeAsync(() => {
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