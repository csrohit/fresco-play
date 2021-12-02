import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  userId: string;

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;

  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(user_name: string, password: string): Observable<boolean> {
    // store 'id' from response as key name 'id' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated

    return this.api.checkLogin(user_name, password)
      .pipe(
        map(user => {
          if (user.success) {
            this.userId = user.id;
            localStorage.setItem('id', user.id)
            localStorage.setItem('token', user.token)
            this.isLoggedIn = true;
            return true;
          } else {
            return false;
          }
        }),
        catchError(err => {
        this.userId = null;
        localStorage.clear();
        this.isLoggedIn = false;
        return of(false);
      }))
      ;
  }

  getAuthStatus(): Observable<boolean> {
    // return true/false as a auth status

    return of(this.isLoggedIn);
  }

  regNewUser(regNewUser): Observable<any> {
    // should return response retrieved from ApiService

    // handle error

    return this.api.regNewUser(regNewUser);
  }

  doLogOut() {
    // You should remove the key 'id', 'token' if exists
    localStorage.clear();
    this.isLoggedIn = false;
    this.userId = null;
  }

  getUserDetails(userId = this.userId): Observable<any> {
    // should return user details retrieved from api service

    return this.api.getUserDetails(userId);
  }

  updateProfile(userId:string, userDetails: any): Observable<any> {
    // should return response retrieved from ApiService

    // handle error

    return this.api.updateDetails(userId, userDetails);
  }

  registerPatient(patientDetails: any): Observable<any> {
    // should return response retrieved from ApiService

    // handle error

    return this.api.registerPatient(patientDetails);
  }

  getAllPatientsList(): Observable<any[]> {
    // should return all patients from server

    // handle error

    return this.api.getAllPatientsList();
  }

  getParticularPatient(id: any): Observable<any> {
    // should return particular patient details from server

    // handle error

    return this.api.getParticularPatient(id);
  }

  diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error

    return this.api.diseasesList();
  }

  scheduleAppointment(appointmentDetails): Observable<any> {
    // should return response from server if appointment booked successfully

    // handle error

    return this.api.scheduleAppointment(appointmentDetails);
  }

  getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server

    // handle error

    return this.api.getSinglePatientAppointments(patientId);
  }

  deleteAppointment(appointmentId): Observable<any> {
    // should delete the appointment

    // handle error

    return this.api.deleteAppointment(appointmentId);
  }

  requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error

    return this.api.requestedAppointments();
  }

  private handleError(error: HttpErrorResponse) {
    // handle error here
    return throwError(error);
  }


}

