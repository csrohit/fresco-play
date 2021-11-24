import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { AllRequestedAppointmentsComponent } from './all-requested-appointments.component';

const mockAppmnt = [
	{
    booking_id: "6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f",
    registeredDate: "2020-05-27T09:14:25.8977665Z",
    ​​disease: "Asthma",
    patientId: "5fedcf3f-72aa-48fb-927a-492003779e07",
    ​​priority: "Normal",
    ​tentativeDate: "2020-05-30T00:00:00"
	},
  {
    booking_id: "6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f",
    registeredDate: "2020-05-27T09:14:25.8977665Z",
    ​​disease: "Asthma",
    patientId: "5fedcf3f-72aa-48fb-927a-492003779e07",
    ​​priority: "Normal",
    ​tentativeDate: "2020-05-30T00:00:00"
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
    path: 'patientList/5fedcf3f-72aa-48fb-927a-492003779e07',
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
    expect(component.view).toHaveBeenCalledWith('5fedcf3f-72aa-48fb-927a-492003779e07');
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
      expect(location.path()).toBe('/patientList/5fedcf3f-72aa-48fb-927a-492003779e07');
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
    expect(component.cancelAppointment).toHaveBeenCalledWith('6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f');
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
    expect(dataService.deleteAppointment).toHaveBeenCalledWith('6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f');
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
