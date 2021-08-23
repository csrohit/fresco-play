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

@Injectable()
export class ApiService {

  API_URL: String;


  constructor(private http: HttpClient) {
    this.API_URL = 'api';

  }

  public checkLogin(uname: string, pwd: string): Observable<any> {
    // should return response from server

    // handle error 

    return;
  }

  public regNewUser(regNewUser): Observable<any> {
    // should return response from server

    // handle error 

    return;
  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server

    // handle error 

    return;
  }

  public updateDetails(userDetails: any): Observable<any> {
    // should return response from server

    // handle error 

    return;
  }

  public registerPatient(patientDetails: any): Observable<any> {
    // should return response from server if patientDetails added successfully

    // handle error 

    return;
  }

  public getAllPatientsList(): Observable<any> {

    // should return all patients from server

    // handle error 

    return;
  }

  public getParticularPatient(patientId): Observable<any> {

    // should return particular patient details from server

    // handle error 

    return;
  }

  public diseasesList(): Observable<any> {

    // should return diseases from server

    // handle error 

    return;
  }

  public scheduleAppointment(appointmentDetails: any): Observable<any> {

    // should return response from server if appointment booked successfully

    // handle error 

    return;
  }

  public requestedAppointments(): Observable<any> {

    // should return all requested appointments from server

    // handle error 

    return;
  }

  public getSinglePatientAppointments(patientId): Observable<any> {

    // should return appointments of particular patient from server

    // handle error 

    return;
  }

  public deleteAppointment(appointmentId): Observable<any> {

    // should delete the appointment

    // handle error

    return;
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
  
}
