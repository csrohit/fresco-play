import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

@Injectable()
export class ApiService {

  API_URL: String;
  AUTH_API_URL = '/auth/server/';

  constructor(private http: HttpClient) {
    this.API_URL = 'api';
  }

  public checkLogin(username: string, password: string): Observable<Credentials> {
    // should return response from server

    // handle error 

    return;
  }

  public getUserDetails(userId: number): Observable<Users> {
    // should return user details retireved from server

    // handle error 

    return;
  }

  public updateDetails(userDetails: Users): Observable<Users> {
    // should return user details if successfully updated the details

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

  public getParticularPatient(id): Observable<any> {

    // should return particular patient details from server

    // handle error 

    return;
  }

  public getDiseasesList(): Observable<any> {

    // should return diseases from server

    // handle error 

    return;
  }

  public bookAppointment(appointmentDetails: any): Observable<any> {

    // should return response from server if appointment booked successfully

    // handle error 

    return;
  }

  public requestedAppointments(): Observable<any> {

    // should return all requested appointments from server

    // handle error 

    return;
  }

  public getAppointments(userId): Observable<any> {

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
