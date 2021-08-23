import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../component/login/login.component';
import { RegisterNewUserComponent } from '../component/register-new-user/register-new-user.component';
import { FormComponent } from '../component/form/form.component';
import { ProfileComponent } from '../component/profile/profile.component';
import { AllPatientsListComponent } from '../component/all-patients-list/all-patients-list.component';
import { ViewPatientComponent } from '../component/view-patient/view-patient.component';
import { AllRequestedAppointmentsComponent } from '../component/all-requested-appointments/all-requested-appointments.component';
import { ApiService } from './api.service';
import { AuthGuardService } from './auth-guard.service';
import { DataService } from './data.service';

class MockDataServiceService {
  getAuthStatus(): Observable<boolean> { return of(false); }

}

describe('AuthGuardService', () => {

  let dataService: DataService;
  let authGuard: AuthGuardService;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
	    LoginComponent,
	    RegisterNewUserComponent,
	    FormComponent,
	    AllPatientsListComponent,
	    ViewPatientComponent,
	    AllRequestedAppointmentsComponent,
	    ProfileComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: DataService, useClass: MockDataServiceService },
        AuthGuardService,
        HttpClient,
        HttpHandler,
        ApiService

      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });

    dataService = TestBed.get(DataService);
    authGuard = TestBed.get(AuthGuardService);
    location = TestBed.get(Location);
  });

  it('#canActivate should return true for logged in users', fakeAsync(() => {
    spyOn(dataService, 'getAuthStatus').and.returnValue(of(true));
    tick();
    expect(authGuard.canActivate()).toBeTruthy();
  }));

  it('#canActivate should return false and navigate to login if user is not logged in', fakeAsync(() => {
    authGuard.canActivate();
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('#canActivate should navigate to login if error occurs', fakeAsync(() => {
    spyOn(dataService, 'getAuthStatus').and.returnValue(Observable.throw(new HttpErrorResponse({ status: 404 })));
    authGuard.canActivate();
    tick();
    expect(location.path()).toBe('/login');
  }));

});



