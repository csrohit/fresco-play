import { HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, of, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  userId : string;

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

    return;
  }

  getAuthStatus(): Observable<boolean> {
    // return true/false as a auth status

    return
  }

  regNewUser(regNewUser): Observable<any> {
    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  doLogOut() {
    // You should remove the key 'id', 'token' if exists
  }

  getUserDetails(): Observable<any> {
    // should return user details retrieved from api service

    return;
  }

  updateProfile(userId:string, userDetails): Observable<boolean> {
    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  registerPatient(patientDetails): Observable<any> {
    // should return response retrieved from ApiService

    // handle error 

    return;
  }

  getAllPatientsList(): Observable<any> {
    // should return all patients from server

    // handle error 

    return;
  }

  getParticularPatient(id): Observable<any> {
    // should return particular patient details from server

    // handle error 

    return;
  }
  
  diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error 

    return;
  }

  scheduleAppointment(appointmentDetails): Observable<any> {
    // should return response from server if appointment booked successfully

    // handle error 

    return;
  }

  getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server

    // handle error 

    return;
  }

  deleteAppointment(appointmentId): Observable<any> {
    // should delete the appointment

    // handle error

    return
  }

  requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error 

    return;
  }

  private handleError(error: HttpErrorResponse) {
    // handle error here
  }


}

