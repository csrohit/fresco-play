import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { AllRequestedAppointmentsComponent } from './all-requested-appointments.component';

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
    path: 'patientList/5d8e150b3768ab34dc7e607c',
    component: MockComponent
  }
];

class MockDataService {

  public requestedAppointments(): Observable<any> {
  	return of(mockAppmnt);
  }

  public deleteAppointment(appointmentId) {
  	return of(expectedRes);
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
    spyOn(dataService,'requestedAppointments').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    expect(component.view).toHaveBeenCalledWith('5d8e150b3768ab34dc7e607c');
  }));

  it('should navigate to patientList page with selected patientId', fakeAsync(() => {
  	spyOn(component, 'view').and.callThrough();
    spyOn(dataService,'requestedAppointments').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/patientList/5d8e150b3768ab34dc7e607c');
    });
  }));

  it('should call cancelAppointment method with the id of selected patient', fakeAsync(() => {
  	spyOn(component, 'cancelAppointment').and.callThrough();
    spyOn(dataService,'requestedAppointments').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    cancelBtn = fixture.nativeElement.querySelector('#reject');
    cancelBtn.click();
    fixture.detectChanges();
    expect(component.cancelAppointment).toHaveBeenCalledWith('5d8de4671753e027ed7e5358');
  }));

  it('should call deleteAppointment method of dataService with the id of selected patient', fakeAsync(() => {
  	spyOn(component, 'cancelAppointment').and.callThrough();
    spyOn(dataService,'requestedAppointments').and.callThrough();
    spyOn(dataService,'deleteAppointment').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    cancelBtn = fixture.nativeElement.querySelector('#reject');
    cancelBtn.click();
    fixture.detectChanges();
    expect(dataService.deleteAppointment).toHaveBeenCalledWith('5d8de4671753e027ed7e5358');
  }));

  it('should fetch all appointments after cancelling an appointment', fakeAsync(() => {
  	spyOn(component, 'appointments').and.callThrough();
  	spyOn(component, 'cancelAppointment').and.callThrough();
    spyOn(dataService,'requestedAppointments').and.callThrough();
    spyOn(dataService,'deleteAppointment').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    cancelBtn = fixture.nativeElement.querySelector('#reject');
    cancelBtn.click();
    fixture.detectChanges();
    expect(component.appointments).toHaveBeenCalled();
  }));

});
