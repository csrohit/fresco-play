import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { ViewPatientComponent } from './view-patient.component';


const patientDetails = {
  'patientId': 20,
  'firstName': 'test',
  'mobile': 1234567890,
  'gender': 'female',
  'id': 11
};
const patientList = [patientDetails];

const diseasesList = [
	{name: 'fever'},
	{name: 'cold'}
];

const bookAppointment = { 
  status: 'Requested', 
  patientId: undefined, 
  patientFirstName: 'test', 
  patientLastName: undefined, 
  disease: 'xxxxxxx', 
  priority: 'yyyyyyyy', 
  tentativedate: '2018-12-25', 
  registeredTime: 'Date(Thu Sep 19 2019 12:38:28 GMT+0530 (India Standard Time))' };
const deleteMockResponse = {};

@Component({
  selector: 'app-mock',
  template: ``
})
class MockComponent { }

const mockRoutes = [
  {
    path: 'login',
    component: MockComponent
  },
  {
    path: 'patientList/20',
    component: MockComponent
  },
  {
    path: 'patientList/17',
    component: MockComponent
  },
  {
    path: 'requested_appointments',
    component: MockComponent
  }
];

class MockDataService {

  public getParticularPatient(id): Observable<any> {
	return of(patientDetails);
  }

  public getDiseasesList(): Observable<any> {
  	return of(diseasesList);
  }

  public bookAppointment(appointmentDetails: any) {
  	return of(patientDetails);
  }

  public getAppointments(userId): Observable<any> {
  	return of(patientList);
  }

  public deleteAppointment(appointmentId): Observable<any> {
    return of(deleteMockResponse)
  }

}

describe('ViewPatientComponent', () => {
  let component: ViewPatientComponent;
  let fixture: ComponentFixture<ViewPatientComponent>;
  let dataService: DataService;
  let bookBtn = HTMLElement;
  let schdldBtn = HTMLElement;
  let bookAppnmt = HTMLElement;
  let SchdldAppnmt = HTMLElement;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPatientComponent, MockComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(mockRoutes),
      ],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    location = TestBed.get(Location);
    bookAppnmt = fixture.nativeElement.querySelector('#form-container');
    SchdldAppnmt = fixture.nativeElement.querySelector('#table-container');
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should call getParticularPatient method of DataService by default', fakeAsync(() => {
  	spyOn(dataService, 'getParticularPatient').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(dataService.getParticularPatient).toHaveBeenCalled();
  }));

  it('Book Appointment & Scheduled Appointment should be enabled by default', fakeAsync(() => {
    expect(fixture.debugElement.nativeElement.querySelector('#book-appointment').disabled).toBeFalsy();
    expect(fixture.debugElement.nativeElement.querySelector('#Scheduled-appointment').disabled).toBeFalsy();
    expect(bookAppnmt).toBeFalsy();
    expect(SchdldAppnmt).toBeFalsy();
  }));

  it('"Book Appointment" button should be disabled after clicking on that button', fakeAsync(() => {
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#book-appointment').click();
      tick();
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('#book-appointment').disabled).toBeTruthy();
	    expect(fixture.debugElement.nativeElement.querySelector('#Scheduled-appointment').disabled).toBeFalsy();
	    
	    expect(fixture.nativeElement.querySelector('#form-container')).toBeTruthy();
	    expect(fixture.nativeElement.querySelector('#table-container')).toBeFalsy();
    });
  }));

  it('"Scheduled Appointment" button should be disabled after clicking on that button', fakeAsync(() => {
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#Scheduled-appointment').click();
      tick();
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('#book-appointment').disabled).toBeFalsy();
	    expect(fixture.debugElement.nativeElement.querySelector('#Scheduled-appointment').disabled).toBeTruthy();

	    expect(fixture.nativeElement.querySelector('#form-container')).toBeFalsy();
	    expect(fixture.nativeElement.querySelector('#table-container')).toBeTruthy();
    });
  }));

  it('should get diseasesList when clicking on "Book Appointment"', fakeAsync(() => {
    spyOn(component,'bookAppointment').and.callThrough();
    spyOn(dataService,'getDiseasesList').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#book-appointment').click();
      tick();
      fixture.detectChanges();
	    expect(fixture.nativeElement.querySelector('#form-container')).toBeTruthy();
	    expect(component.bookAppointment).toHaveBeenCalled();
	    expect(dataService.getDiseasesList).toHaveBeenCalled();
    });
  }));

  it('should call scheduleAppointment method for valid form input"', fakeAsync(() => {
    spyOn(component,'bookAppointment').and.callThrough();
    spyOn(component,'scheduleAppointment').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#book-appointment').click();
      tick();
      fixture.detectChanges();
	    expect(fixture.nativeElement.querySelector('#form-container')).toBeTruthy();
      component.appointmentForm.controls['selectDisease'].setValue('xxxxxxx');
      component.appointmentForm.controls['priority'].setValue('yyyyyyyy');
      component.appointmentForm.controls['tentativeDate'].setValue('2018-12-25');
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#submit-btn').click();
      tick();
      fixture.detectChanges();
      expect(component.appointmentForm.valid).toBeTruthy();
      expect(component.scheduleAppointment).toHaveBeenCalled();
    });
  }));

  it('should call bookAppointment method of DataService with appointment details', fakeAsync(() => {
    spyOn(component,'bookAppointment').and.callThrough();
    spyOn(component,'scheduleAppointment').and.callThrough();
    spyOn(dataService,'bookAppointment').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#book-appointment').click();
      tick();
      fixture.detectChanges();
      component.appointmentForm.controls['selectDisease'].setValue('xxxxxxx');
      component.appointmentForm.controls['priority'].setValue('yyyyyyyy');
      component.appointmentForm.controls['tentativeDate'].setValue('2018-12-25');
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#submit-btn').click();
      tick();
      fixture.detectChanges();
      expect(dataService.bookAppointment).toHaveBeenCalled();
    });
  }));

  it('should navigate to requested_appointments page after booking an appointment', fakeAsync(() => {
    spyOn(component,'bookAppointment').and.callThrough();
    spyOn(component,'scheduleAppointment').and.callThrough();
    spyOn(dataService,'bookAppointment').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#book-appointment').click();
      tick();
      fixture.detectChanges();
      component.appointmentForm.controls['selectDisease'].setValue('xxxxxxx');
      component.appointmentForm.controls['priority'].setValue('yyyyyyyy');
      component.appointmentForm.controls['tentativeDate'].setValue('2018-12-25');
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#submit-btn').click();
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/requested_appointments');
    });
  }));

  it('should call cancelAppointment method with selected appointment id', fakeAsync(() => {
    spyOn(component,'cancelAppointment').and.callThrough();
    spyOn(component,'scheduledAppointment').and.callThrough();
    spyOn(dataService,'deleteAppointment').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#Scheduled-appointment').click();
      tick();
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#user-cancel').click();
      tick();
      fixture.detectChanges();
      expect(component.cancelAppointment).toHaveBeenCalledWith(11);
    });
  }));

  it('should call deleteAppointment method of DataService with selected appointment id', fakeAsync(() => {
    spyOn(component,'cancelAppointment').and.callThrough();
    spyOn(component,'scheduledAppointment').and.callThrough();
    spyOn(dataService,'deleteAppointment').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#Scheduled-appointment').click();
      tick();
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#user-cancel').click();
      tick();
      fixture.detectChanges();
      expect(dataService.deleteAppointment).toHaveBeenCalledWith(11);
    });
  }));

  it('should call scheduleded method after deleting an appointment', fakeAsync(() => {
    spyOn(component,'cancelAppointment').and.callThrough();
    spyOn(component,'scheduledAppointment').and.callThrough();
    spyOn(dataService,'deleteAppointment').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#Scheduled-appointment').click();
      tick();
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#user-cancel').click();
      tick();
      fixture.detectChanges();
      expect(component.scheduledAppointment).toHaveBeenCalled();
    });
  }));

});
