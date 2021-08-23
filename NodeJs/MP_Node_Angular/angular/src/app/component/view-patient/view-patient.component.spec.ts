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

const mockSinlePatientDetails = {
  "_id": "5d8e150b3768ab34dc7e607c",
  "fname": "fnmae",
  "lname": "lname",
  "gender": "Male",
  "dob": "2019-08-31T00:00:00.000Z",
  "mobile": 9988776655,
  "email": "abcd@def.gh",
  "desc": "nothing",
  "userId": "5d89f8f95327ae2548c8ad98",
  "createdAt": "2019-09-28T19:19:10.642Z",
  "updatedAt": "2019-09-28T19:19:10.642Z"
};

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
  disease: "sore throat",
  fname: "firstname",
  lname: "lastname",
  patientId: "5d8b0549f913d612b39aa9e4",
  priority: "Normal",
  registeredTime: new Date('2018-04-05T06:13:22.865Z'), 
  tentativeDate: "2019-10-05"
};

const mockAppmnt = [
  {
    AppointmentDate: "2019-10-03T00:00:00.000Z",
    bookingTime: "2019-09-27T10:28:55.042Z",
    disease: "acid reflex",
    fname: "firstname",
    lname: "lastname",
    patientId: "5d8e150b3768ab34dc7e607c",
    priority: "Normal",
    _id: "5d8de4671753e027ed7e5358"
  },
  {
    AppointmentDate: "2019-10-03T00:00:00.000Z",
    bookingTime: "2019-09-27T10:28:55.042Z",
    disease: "acid reflex",
    fname: "firstname",
    lname: "lastname",
    patientId: "5d8e150b3768ab34dc7e607c",
    priority: "Normal",
    _id: "5d8de4671753e027ed7e5359"
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
      expect(component.cancelAppointment).toHaveBeenCalledWith('5d8de4671753e027ed7e5358');
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
      expect(dataService.deleteAppointment).toHaveBeenCalledWith('5d8de4671753e027ed7e5358');
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
      expect(dataService.getSinglePatientAppointments).toHaveBeenCalledWith('5d8e150b3768ab34dc7e607c');
    });
  }));

});
