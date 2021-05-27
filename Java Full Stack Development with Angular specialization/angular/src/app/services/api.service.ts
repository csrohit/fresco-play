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
import { Disease } from '../models/Disease';

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
        return this.http.get<Users>(this.API_URL + '/users/' + userId);
        // handle error
    }

    public updateDetails(userDetails: Users): Observable<Users> {
        // should return user details if successfully updated the details

        // handle error

        return;
    }

    public registerPatient(patientDetails: Patient): Observable<Patient> {

        // should return response from server if patientDetails added successfully

        // handle error

        return this.http.post<Patient>(this.API_URL + '/allpatients', patientDetails);
    }

    public getAllPatientsList(): Observable<Patient[]> {

        // should return all patients from server

        // handle error

        return this.http.get<Patient[]>(this.API_URL + '/allpatients');
    }

    public getParticularPatient(id: number): Observable<Patient> {

        // should return particular patient details from server

        // handle error

        return this.http.get<Patient>(this.API_URL + '/allpatients/' + id);
    }

    public getDiseasesList(): Observable<Disease[]> {

        // should return diseases from server

        // handle error

        return this.http.get<Disease[]>(this.API_URL + '/diseases');
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
