
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

@Injectable()
export class DataService {

    isLoggedIn = false;
    isLogIn: BehaviorSubject<boolean>;
    constructor(private api: ApiService) {
        this.isLogIn = new BehaviorSubject<boolean>(false);
        this.isLogIn.subscribe(data => {
            if (!data) {
                // localStorage.removeItem('userId');
            }
        })
    }

    authenticateUser(username: string, password: string): Observable<boolean> {
        return this.api.checkLogin(username, password)
            .map(data => {
                if (data && data.userId) {
                    // store 'userId' from response as key name 'userId' to the localstorage
                    localStorage.setItem('userId', data.userId + '');
                    // return true if user authenticated
                    this.isLogIn.next(true);
                    return true;
                } else {
                    // return false if user not authenticated
                    return false;
                }
            });
    }

    getAuthStatus(): Observable<boolean> {
        this.isLogIn.next(this.getUserId() > 0 ? true : false);
        return this.isLogIn.asObservable(); // passed
    }
    doLogOut() {
        // remove the key 'userId' if exists
        this.isLoggedIn = false;
        if (localStorage.getItem('userId')) {
            localStorage.removeItem('userId');
        }
        this.isLogIn.next(false);
        return this.isLoggedIn;
    }

    getUserDetails(userId: number): Observable<Users> {
        // should return user details retrieved from api service
        return this.api.getUserDetails(userId);
    }

    updateProfile(userDetails): Observable<boolean> {
        // should return the updated status according to the response from api service
        return this.api.updateDetails(userDetails)
            .map(data => data ? true : false).catch((error) => Observable.throw(undefined));
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
        return this.api.bookAppointment(appointmentDetails);
    }

    getAppointments(patientId): Observable<any> {
        // should return response retrieved from ApiService
        // handle error
        return this.api.getAppointments(patientId);
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

    getUserId(): number {
        // retrieve 'userId' from localstorage
        const userId = parseInt(localStorage.getItem('userId'), 10);
        if (!this.isLogIn.value)
            return -1;
        return userId ? userId : -1;
    }


}

