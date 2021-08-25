import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

  API_URL: String;


  constructor(private http: HttpClient) {
    this.API_URL = 'http://localhost:8000';

  }

  public checkLogin(uname: string, pwd: string): Observable<any> {
    // should return response from server
    return this.http.post(`${this.API_URL}/login`, {uname, pwd})
      .pipe(catchError(this.handleError));
    // handle error 

  }

  public regNewUser(regNewUser): Observable<any> {
    // should return response from server
    return this.http.post(`${this.API_URL}/register`, regNewUser)
    .pipe(catchError(this.handleError));
    // handle error 

  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server
    return this.http.get(`${this.API_URL}/getProfile?uid=${userId}`)
    .pipe(catchError(this.handleError));
    // handle error 

    return;
  }

  public updateDetails(userDetails: any): Observable<any> {
    // should return response from server
    return this.http.put(`${this.API_URL}/editProfile`, userDetails)
    .pipe(catchError(this.handleError));
    // handle error 

    return;
  }

  public registerPatient(patientDetails: any): Observable<any> {
    // should return response from server if patientDetails added successfully
    return this.http.post(`${this.API_URL}/addPatient`, patientDetails)
    .pipe(catchError(this.handleError));
    // handle error 

    return;
  }

  public getAllPatientsList(): Observable<any> {

    // should return all patients from server
    return this.http.get(`${this.API_URL}/fetchPatient`)
    .pipe(catchError(this.handleError));
    // handle error 

    return;
  }

  public getParticularPatient(patientId): Observable<any> {

    // should return particular patient details from server
    return this.http.get(`${this.API_URL}/fetchSinglePatient?patientId=${patientId}`)
    .pipe(catchError(this.handleError));
    // handle error 

    return;
  }

  public diseasesList(): Observable<any> {

    // should return diseases from server
    return this.http.get(`${this.API_URL}/diseases`)
    .pipe(catchError(this.handleError));
    // handle error 

    return;
  }

  public scheduleAppointment(appointmentDetails: any): Observable<any> {

    // should return response from server if appointment booked successfully
    return this.http.post(`${this.API_URL}/bookAppointment`, appointmentDetails)
    .pipe(catchError(this.handleError));
    // handle error 

    return;
  }

  public requestedAppointments(): Observable<any> {

    // should return all requested appointments from server
    return this.http.get(`${this.API_URL}/fetchAppointment`)
    .pipe(catchError(this.handleError));
    // handle error 

    return;
  }

  public getSinglePatientAppointments(patientId): Observable<any> {

    // should return appointments of particular patient from server
    return this.http.get(`${this.API_URL}/singlePatientAppointments?patientId=${patientId}`)
    .pipe(catchError(this.handleError));
    // handle error 

    return;
  }

  public deleteAppointment(appointmentId): Observable<any> {

    // should delete the appointment
    return this.http.delete(`${this.API_URL}/deleteAppointment?appointmentId=${appointmentId}`)
    .pipe(catchError(this.handleError));
    // handle error

    return;
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
  
}
