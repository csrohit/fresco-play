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
    allPatients: Patient[] = [];
    appointments: Appointment[] = [];
    users: Users[] = [];
    authUsers: {
        id: number;
        username: string;
        password: string;
    }[] = [];

    constructor(private http: HttpClient) {
        this.API_URL = 'api';
    }

    public checkLogin(username: string, password: string): Observable<Credentials> {
        return this.http.post<Credentials>(this.API_URL + this.AUTH_API_URL, { username, password });
    }

    public getUserDetails(userId: number): Observable<Users> {
        // should return user details retireved from server
        return this.http.get<Users>(this.API_URL + '/users/' + userId).catch(this.handleError);
        // handle error
    }

    public updateDetails(userDetails: Users): Observable<Users> {
        // should return user details if successfully updated the details

        // handle error

        return this.http.put<Users>(this.API_URL + '/users/' + userDetails.userId, userDetails);
    }

    public registerPatient(patientDetails: any): Observable<any> {
        // should return response from server if patientDetails added successfully
        // handle error
        return this.http.post<Patient>(this.API_URL + '/allpatients', patientDetails).catch(this.handleError);
    }

    public getAllPatientsList(): Observable<any> {
        // should return all patients from server
        // handle error
        return this.http.get<any>(this.API_URL + '/allpatients');
    }

    public getParticularPatient(id: number): Observable<any> {
        // should return particular patient details from server
        // handle error
        return this.http.get<any>(this.API_URL + '/allpatients/' + id);
    }

    public getDiseasesList(): Observable<any[]> {
        // should return diseases from server
        // handle error
        return this.http.get<any[]>(this.API_URL + '/diseases');
    }

    public bookAppointment(appointmentDetails): Observable<any> {

        // should return response from server if appointment booked successfully

        // handle error

        return this.http.post<Appointment>(this.API_URL + '/reqappointments', appointmentDetails);
    }

    public requestedAppointments(): Observable<any> {

        // should return all requested appointments from server

        // handle error

        return this.http.get<Appointment[]>(this.API_URL + '/reqappointments');
    }

    public getAppointments(userId): Observable<any> {

        // should return appointments of particular patient from server

        // handle error

        return this.http.get<Appointment[]>(this.API_URL + '/reqappointments?patientId=' + userId).catch(this.handleError);
    }

    public deleteAppointment(appointmentId): Observable<any> {
        // should delete the appointment
        // handle error
        return this.http.delete<void>(this.API_URL + '/reqappointments/' + appointmentId).catch(this.handleError);
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }

}
