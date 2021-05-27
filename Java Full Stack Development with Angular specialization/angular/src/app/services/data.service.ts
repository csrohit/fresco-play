
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operator/map';
import { Disease } from '../models/Disease';

@Injectable()
export class DataService {

    isLoggedIn = false;
    isLogIn: BehaviorSubject<boolean>;
    constructor(private api: ApiService) {
        this.isLogIn = new BehaviorSubject<boolean>(false);
    }

    authenticateUser(username: string, password: string): Observable<boolean> {
        return this.api.checkLogin(username, password)
            .map(data => {
                if (data && data.userId) {
                    // store 'userId' from response as key name 'userId' to the localstorage
                    localStorage.setItem('userId', data.userId + '');
                    // return true if user authenticated
                    return true;
                } else {
                    // return false if user not authenticated
                    return false;
                }
            });
    }

    getAuthStatus(): Observable<boolean> {
        return this.isLogIn.asObservable(); // passed
    }
    doLogOut() {
        // remove the key 'userId' if exists
        this.isLoggedIn = false;
        if (localStorage.getItem('userId')) {
            localStorage.removeItem('userId');
        }

    }

    getUserDetails(userId: number): Observable<Users> {

        // should return user details retrieved from api service

        return this.api.getUserDetails(userId);
    }

    updateProfile(userDetails): Observable<boolean> {

        // should return the updated status according to the response from api service
        return this.api.updateDetails(userDetails)
            .map(data => data ? true : false);
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

    getParticularPatient(id: number): Observable<any> {

        // should return particular patient details retrieved from ApiService

        // handle error

        return this.api.getParticularPatient(id);
    }

    getDiseasesList(): Observable<any> {

        // should return response retrieved from ApiService

        // handle error

        return this.api.getDiseasesList();
    }

    bookAppointment(appointmentDetails): Observable<any> {

        // should return response retrieved from ApiService

        // handle error

        return;
    }

    getAppointments(patientId): Observable<any> {

        // should return response retrieved from ApiService

        // handle error

        return;
    }

    deleteAppointment(appointmentId): Observable<any> {

        // should return response retrieved from ApiService

        // handle error

        return;
    }

    requestedAppointments(): Observable<any> {

        // should return response retrieved from ApiService

        // handle error

        return;
    }

    getUserId(): number {

        // retrieve 'userId' from localstorage

        return parseInt(localStorage.getItem('userId'), 10);
    }


}

