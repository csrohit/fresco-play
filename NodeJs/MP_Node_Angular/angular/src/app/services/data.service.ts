import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { map } from 'rxjs/operator/map';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DataService {

  userId: string = null;

  constructor(private api: ApiService) {

  }

  authenticateUser(username: string, password: string): Observable<boolean> {

    // store 'uid' from response as key name 'uid' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated 

    return this.api.checkLogin(username, password)
      .map(user => {
        if (user.success) {
          this.userId = user.uid;
          localStorage.setItem('uid', user.uid)
          localStorage.setItem('token', user.token)
          return true;
        } else {
          return false;
        }
      }).pipe(catchError(err => {
        this.userId = null;
        localStorage.clear();
        return of(false);
      }))
      ;
  }

  getAuthStatus(): Observable<boolean> {

    // return true/false as a auth status

    return of(this.userId ? true : false);
  }

  regNewUser(regNewUser): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.regNewUser(regNewUser);
  }

  doLogOut() {

    // You should remove the key 'uid', 'token' if exists
    localStorage.clear();

  }

  getUserDetails(): Observable<any> {

    // should return user details retrieved from api service

    return this.api.getUserDetails(this.userId);
  }

  updateProfile(userDetails): Observable<boolean> {

    // should return response retrieved from ApiService
    // handle error 

    return this.api.updateDetails(userDetails);
  }

  registerPatient(patientDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.registerPatient(patientDetails);
  }

  getAllPatientsList(): Observable<any> {

    // should return all patients list retrieved from ApiService

    // handle error 

    return this.api.getAllPatientsList();
  }

  getParticularPatient(id): Observable<any> {

    // should return particular patient details retrieved from ApiService

    // handle error 

    return this.api.getParticularPatient(id);
  }

  diseasesList(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.diseasesList();
  }

  scheduleAppointment(appointmentDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.scheduleAppointment(appointmentDetails);
  }

  getSinglePatientAppointments(patientId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.getSinglePatientAppointments(patientId);
  }

  deleteAppointment(appointmentId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.deleteAppointment(appointmentId);
  }

  requestedAppointments(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.requestedAppointments();
  }


}

