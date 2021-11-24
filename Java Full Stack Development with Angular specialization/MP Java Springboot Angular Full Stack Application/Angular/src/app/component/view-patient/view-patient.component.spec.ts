import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { ViewPatientComponent } from './view-patient.component';

const mockSinlePatientDetails = {
  ​patient_Id: "5fedcf3f-72aa-48fb-927a-492003779e07",
  patient_dob: "2020-05-14",
  patient_email: "jhjh@jkk",
  patient_gender: "Male",
  patient_mobile: 9090909090,
  patient_name: "sfsdssdds",
  registeredDate: "2020-05-27T09:10:56.3460596Z"
}

const mockDiseases = [
  "aches",
  "fever,pain",
  "sore throat",
  "flu",
  "common cold",
  "acid reflex",
  "constipation",
  "abdominal pain",
  "ulcerative colitis",
  "conjuctivitis",
  "acne"
];

const mockBookAppReq = {
  disease: "Asthma",
  ​patient_Id: "5fedcf3f-72aa-48fb-927a-492003779e07",
  ​priority: "Normal",
  ​tentativeDate: "2020-05-28"
};

const mockAppmnt = [
	{
    booking_id: "6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f",
    ​​bookingTime: "2020-05-27T09:14:25.8977665Z",
    ​​disease: "Asthma",
    patient_Id: "5fedcf3f-72aa-48fb-927a-492003779e07",
    ​​priority: "Normal",
    ​tentativeDate: "2020-05-30T00:00:00"
	},
  {
    booking_id: "6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f",
    ​​bookingTime: "2020-05-27T09:14:25.8977665Z",
    ​​disease: "Asthma",
    patient_Id: "5fedcf3f-72aa-48fb-927a-492003779e07",
    ​​priority: "Normal",
    ​tentativeDate: "2020-05-30T00:00:00"
  }
];


const expectedRes = {status: "success"};

const expectedErrorResponse = {
  status: 404,
  message: 'Not found'
};

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
	return of(mockSinlePatientDetails);
  }

  public diseasesList(): Observable<any> {
  	return of(mockDiseases);
  }

  public scheduleAppointment(appointmentDetails: any) {
  	return of(expectedRes);
  }

  public getSinglePatientAppointments(userId): Observable<any> {
  	return of(mockAppmnt);
  }

  public deleteAppointment(appointmentId): Observable<any> {
    return of(expectedRes)
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

  it('"Scheduled Appointment" button should be disabled after clicking on "Scheduled Appointment"', fakeAsync(() => {
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

  it('"Book Appointment" button should be disabled after clicking on "Scheduled Appointment"', fakeAsync(() => {
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
    spyOn(dataService,'diseasesList').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#book-appointment').click();
      tick();
      fixture.detectChanges();
	    expect(fixture.nativeElement.querySelector('#form-container')).toBeTruthy();
	    expect(component.bookAppointment).toHaveBeenCalled();
	    expect(dataService.diseasesList).toHaveBeenCalled();
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

  it('should call scheduleAppointment method of DataService with appointment details', fakeAsync(() => {
    spyOn(component,'bookAppointment').and.callThrough();
    spyOn(component,'scheduleAppointment').and.callThrough();
    spyOn(dataService,'scheduleAppointment').and.callThrough();
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
      expect(dataService.scheduleAppointment).toHaveBeenCalled();
    });
  }));

  it('should navigate to requested_appointments page after booking an appointment', fakeAsync(() => {
    spyOn(component,'bookAppointment').and.callThrough();
    spyOn(component,'scheduleAppointment').and.callThrough();
    spyOn(dataService,'scheduleAppointment').and.callThrough();
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
      expect(component.cancelAppointment).toHaveBeenCalledWith('6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f');
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
      expect(dataService.deleteAppointment).toHaveBeenCalledWith('6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f');
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

  it('should get particular patient appointments when clicking on "scheduled Appointment" button', fakeAsync(() => {
    spyOn(component,'scheduledAppointment').and.callThrough();
    spyOn(dataService,'getSinglePatientAppointments').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#Scheduled-appointment').click();
      fixture.detectChanges();
      expect(dataService.getSinglePatientAppointments).toHaveBeenCalledWith('5fedcf3f-72aa-48fb-927a-492003779e07');
    });
  }));

});
