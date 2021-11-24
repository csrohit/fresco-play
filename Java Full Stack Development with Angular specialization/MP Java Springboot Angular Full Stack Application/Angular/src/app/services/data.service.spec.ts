import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { ApiService } from './api.service';
import { DataService} from './data.service';


const mockLoginRes = {
  id: "d5b3464f-54bb-4692-86d1-086becf938fa",
  message: "Authentication Successful",
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

  public checkLogin(user_email: string, password: string): Observable<any> {
    return of(mockLoginRes);
  }

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
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  });


  it('authenticateUser should return true if auth success', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.callThrough();
    tick();
    dataService.authenticateUser('xxxx12', 'Aaaaaaaaaa2!').subscribe((res) => {
      expect(res).toBeTruthy();
    });
  }));

  it('authenticateUser should store id, token in localStorage if auth success', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.callThrough();
    tick();
    dataService.authenticateUser('xxxx12', 'Aaaaaaaaaa2!').subscribe((res) => {
      expect(res).toBeTruthy();
    });
    tick();
    expect(localStorage.getItem('id')).toEqual('d5b3464f-54bb-4692-86d1-086becf938fa');
    expect(localStorage.getItem('token')).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGhjcy5jb20iLCJuYmYiOjE1OTA1NzAxMzIsImV4cCI6MTU5MTE3NDkzMiwiaWF0IjoxNTkwNTcwMTMyfQ.5kdqQdVj');

  }));


  it('authenticateUser should return false on occurence of error', fakeAsync(() => {
    const spy = spyOn(apiService, 'checkLogin').and.returnValue(throwError(errorResponse));
    tick();
    dataService.authenticateUser('user','Passwddd4!').subscribe((res) => {
      expect(res).toBeFalsy();
    },
      (err) => {
        tick();
        expect(err).toBeDefined();

      });
  }));

  // it('getAuthStatus should return true for valid users for checking auth status', fakeAsync(() => {
  //   spyOn(apiService, 'checkLogin').and.callThrough();
  //   tick();
  //   dataService.authenticateUser('test', 'password').subscribe((res) => {
  //     dataService.getAuthStatus().subscribe((response) => {
  //       expect(response).toBeTruthy();
  //     });
  //   });

  // }));

  // it('getAuthStatus should return false for invalid users for checking auth status', fakeAsync(() => {
  //   spyOn(apiService, 'checkLogin').and.returnValue(throwError(errorResponse));
  //   tick();
  //   dataService.authenticateUser('test', 'password').subscribe((res) => {
  //     dataService.getAuthStatus().subscribe((response) => {
  //       expect(response).toBeFalsy();
  //     });
  //   });
  // }));


  it('regNewUser should return success status if user added successfully', fakeAsync(() => {

		const mockReqBody = {
			user_email: "hgjhg@qqu.in",
			location: "edttop",
			user_mobile: 8809871111,
			password: "Pjkhkjhjk2!",
			user_name: "usffds"		
		}

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
			user_email: "hgjhg@qqu.in",
			location: "edttop",
			user_mobile: 8809871111,
			password: "Pjkhkjhjk2!",
			user_name: "usffds"		
		}

    spyOn(apiService, 'regNewUser').and.returnValue(throwError({ status: 422, statusText: 'failed' }));
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
    dataService.authenticateUser('xxxxx@yyy.in', 'Aaaaaaaaaa2!').subscribe((res) => {
    });
    tick();
    dataService.doLogOut();
    expect(localStorage.getItem('id')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  }));


  it('getUserDetails should return user details on providing valid user id', fakeAsync(() => {
    spyOn(apiService, 'checkLogin').and.callThrough();
    spyOn(apiService, 'getUserDetails').and.callThrough();
    tick();
    dataService.authenticateUser('xxxxx@yyy.in', 'Aaaaaaaaaa2!').subscribe((res) => {
      expect(res).toBeTruthy();
    });
    tick();
    dataService.getUserDetails().subscribe((res) => {
      expect(res).toBe(mockUserDetails);
    },
      (error) => {
        expect(error).toBeUndefined();
      });
    expect(apiService.getUserDetails).toHaveBeenCalledWith('d5b3464f-54bb-4692-86d1-086becf938fa');
  }));

  it('getUserDetails should return error on occurence of error', fakeAsync(() => {
    spyOn(apiService, 'getUserDetails').and.returnValue(throwError(errorResponse));
    dataService.getUserDetails().subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));


  it('updateProfile should return true on providing valid user details', fakeAsync(() => {

	  const userId = '7ae2548c8ad985';
		const mockReqBody = {
			user_email: "aquib@abc.com",
			location: "shimla",
			user_mobile: 7576576577
		}

    spyOn(apiService, 'updateDetails').and.callThrough();
    tick();
    dataService.updateProfile(userId, mockReqBody).subscribe((res) => {
      expect(res).toBeTruthy();
    },
      (error) => {
        expect(error).toBeUndefined();
      });
  }));

  it('updateProfile should return false on occurence of error', fakeAsync(() => {
	  const userId = '7ae2548c8ad985';
		const mockReqBody = {
			user_email: "aquib@abc.com",
			location: "shimla",
			user_mobile: 7576576577
		}

    spyOn(apiService, 'updateDetails').and.returnValue(throwError(errorResponse));
    tick();
    dataService.updateProfile(userId, mockReqBody).subscribe((res) => {
      expect(res).toBeFalsy();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

  it('registerPatient should return patientDetails  on reporting with valid user id ', fakeAsync(() => {
    
    const patientDetails = {
			patient_dob: "2019-08-31",
			patient_email: "abcd@def.gh",
			patient_name: "fnmae",
			patient_gender: "Male",
			patient_mobile: 9988776655,
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
			patient_dob: "2019-08-31",
			patient_email: "abcd@def.gh",
			patient_name: "fnmae",
			patient_gender: "Male",
			patient_mobile: 9988776655,
    };

    spyOn(apiService, 'registerPatient').and.returnValue(throwError(errorResponse));
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
    spyOn(apiService, 'getAllPatientsList').and.returnValue(throwError(errorResponse));
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
    spyOn(apiService, 'getParticularPatient').and.returnValue(throwError(errorResponse));
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
    spyOn(apiService, 'diseasesList').and.returnValue(throwError(errorResponse));
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
    spyOn(apiService, 'scheduleAppointment').and.returnValue(throwError(errorResponse));
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
    spyOn(apiService, 'getSinglePatientAppointments').and.returnValue(throwError(errorResponse));
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
    spyOn(apiService, 'deleteAppointment').and.returnValue(throwError(errorResponse));
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
    spyOn(apiService, 'requestedAppointments').and.returnValue(throwError(errorResponse));
    tick();
    dataService.requestedAppointments().subscribe((res) => {
      expect(res).toBeUndefined();
    },
      (error) => {
        expect(error).toBeDefined();
      });
  }));

});