import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { AllRequestedAppointmentsComponent } from './all-requested-appointments.component';

const patientDetails = {
  'patientId': 20,
  'firstName': 'test',
  'mobile': 1234567890,
  'gender': 'female',
};
const patientList = [patientDetails];

const appointments = [
	{
	  'patientId': 17,
	  'firstName': 'xxxx',
	  'disease': "asthuma",
	  'priority': 'urgent',
	  'id': 12
	},
	{
	  'patientId': 18,
	  'firstName': 'yyyy',
	  'disease': "fever",
	  'priority': 'normal',
	  'id': 13
	}
];

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
  }
];

class MockDataService {

  public requestedAppointments(): Observable<any> {
  	return of(appointments);
  }

  public deleteAppointment(appointmentId) {
  	return of(deleteMockResponse);
  }

}

describe('AllRequestedAppointmentsComponent', () => {
  let component: AllRequestedAppointmentsComponent;
  let fixture: ComponentFixture<AllRequestedAppointmentsComponent>;
  let dataService: DataService;
  let viewBtn: HTMLElement;
  let cancelBtn: HTMLElement;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRequestedAppointmentsComponent, MockComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes(mockRoutes),
      ],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequestedAppointmentsComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    location = TestBed.get(Location);
    viewBtn = fixture.nativeElement.querySelector('#view');
    cancelBtn = fixture.nativeElement.querySelector('#reject');
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should call requestedAppointments method by default ',() => {
  	spyOn(component,'appointments').and.callThrough();
  	spyOn(dataService,'requestedAppointments').and.callThrough();
  	component.ngOnInit();
  	fixture.detectChanges();
  	expect(component.appointments).toHaveBeenCalled();
  	expect(dataService.requestedAppointments).toHaveBeenCalled();
  });

  it('should call view method with the id of selected patient', fakeAsync(() => {
  	spyOn(component, 'view').and.callThrough();
    spyOn(dataService,'requestedAppointments').and.returnValue(of(appointments));
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    expect(component.view).toHaveBeenCalledWith(17);
  }));

  it('should call view method with the id of selected patient', fakeAsync(() => {
  	spyOn(component, 'view').and.callThrough();
    spyOn(dataService,'requestedAppointments').and.returnValue(of(appointments));
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    expect(component.view).toHaveBeenCalledWith(17);
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/patientList/17');
    });
  }));

  it('should call cancelAppointment method with the id of selected patient', fakeAsync(() => {
  	spyOn(component, 'cancelAppointment').and.callThrough();
    spyOn(dataService,'requestedAppointments').and.returnValue(of(appointments));
    component.ngOnInit();
    fixture.detectChanges();
    cancelBtn = fixture.nativeElement.querySelector('#reject');
    cancelBtn.click();
    fixture.detectChanges();
    expect(component.cancelAppointment).toHaveBeenCalledWith(12);
  }));

  it('should call cancelAppointment method with the id of selected patient', fakeAsync(() => {
  	spyOn(component, 'cancelAppointment').and.callThrough();
    spyOn(dataService,'requestedAppointments').and.returnValue(of(appointments));
    spyOn(dataService,'deleteAppointment').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    cancelBtn = fixture.nativeElement.querySelector('#reject');
    cancelBtn.click();
    fixture.detectChanges();
    expect(dataService.deleteAppointment).toHaveBeenCalledWith(12);
  }));

  it('should fetch all appointments after cancelling an appointment', fakeAsync(() => {
  	spyOn(component, 'appointments').and.callThrough();
  	spyOn(component, 'cancelAppointment').and.callThrough();
    spyOn(dataService,'requestedAppointments').and.returnValue(of(appointments));
    spyOn(dataService,'deleteAppointment').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    cancelBtn = fixture.nativeElement.querySelector('#reject');
    cancelBtn.click();
    fixture.detectChanges();
    expect(component.appointments).toHaveBeenCalled();
  }));

});
