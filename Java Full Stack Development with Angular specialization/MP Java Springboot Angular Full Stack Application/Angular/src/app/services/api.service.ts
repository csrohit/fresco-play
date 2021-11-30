import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable , of, throwError} from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiService {

  API_URL: String;

  constructor(private http: HttpClient) {

    this.API_URL = 'api';

  }

  public checkLogin(user_name: string, password: string): Observable<any> {
    // should return response from server

    // handle error

    return this.http.post(`${this.API_URL}/signin`, {user_name, password});
  }

  public regNewUser(regNewUser): Observable<any> {
    // should return response from server

    // handle error

    return this.http.post(`${this.API_URL}/register`, regNewUser);
  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server

    // handle error

    return this.http.get(`${this.API_URL}/viewprofile/${userId}`);
  }

  public updateDetails(userId:string, userDetails: any): Observable<any> {
    // should return response from server

    // handle error

    return this.http.put(`${this.API_URL}/editprofile/${userId}`, userDetails);
  }

  public registerPatient(patient: any): Observable<any> {
    // should return response from server if patientDetails added successfully

    // handle error

    return this.http.post(`${this.API_URL}/patients/register`, patient);
  }

  public getAllPatientsList(): Observable<any> {
    // should return all patients from server

    // handle error

    return this.http.get('api/patients/list/');
  }

  public getParticularPatient(patientId): Observable<any> {
    // should return particular patient details from server

    // handle error

    return this.http.get(`${this.API_URL}/patients/view/${patientId}`);
  }

  public diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error

    return this.http.get(`${this.API_URL}/diseases`);
  }

  public scheduleAppointment(appointmentDetails: any) : Observable<any>{
    // should return response from server if appointment booked successfully

    // handle error

    return this.http.post(`${this.API_URL}/appointment/register`, appointmentDetails);
  }

  public getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server

    // handle error

    return this.http.get(`${this.API_URL}/appointment/list/${patientId}`);
  }

  public deleteAppointment(appointmentId): Observable<any>  {
    // should delete the appointment

    // handle error

    return this.http.delete(`${this.API_URL}/appointment/delete/${appointmentId}`);
  }

  public requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error

    return this.http.get(`${this.API_URL}/appointment/list`);
  }


  private handleError(error: HttpErrorResponse) {
    // handle error here
  }

}
