import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { AllPatientsListComponent } from './all-patients-list.component';


const mockPatientDetails = [
	{
    patient_Id: "5fedcf3f-72aa-48fb-927a-492003779e07",
    patient_dob: "2020-05-14",
    patient_email: "jhjh@jkk",
    patient_gender: "Male",
    patient_mobile: 9090909090,
    patient_name: "sfsdssdds",
    registeredDate: "2020-05-27T09:10:56.3460596Z"
	},
  {
    patient_Id: "5fedcf3f-72aa-48fb-927a-492003779e07",
    patient_dob: "2020-05-14",
    patient_email: "jhjh@jkk",
    patient_gender: "Male",
    patient_mobile: 9090909090,
    patient_name: "sfsdssdds",
    registeredDate: "2020-05-27T09:10:56.3460596Z"
  }
];

const patientList2 = [
  {
    patient_Id: "5d8fb22e1d9d0652ef4781ad",
    patient_dob: "2002-03-27",
    patient_email: "user1@hcs.com",
    patient_gender: "Male",
    patient_mobile: 9090909012,
    patient_name: "name",
    registeredDate: "2020-05-27T09:10:56.3460596Z"
  }
];

class MockDataService {

  public getAllPatientsList(): Observable<any> {
  	return of(mockPatientDetails);
  }

}

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
  },
  {
    path: 'patientList/5d8fb22e1d9d0652ef4781ad',
    component: MockComponent
  }
];

describe('AllPatientsListComponent', () => {
  let component: AllPatientsListComponent;
  let fixture: ComponentFixture<AllPatientsListComponent>;
  let dataService: DataService;
  let viewBtn: HTMLElement;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPatientsListComponent, MockComponent ],
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
    fixture = TestBed.createComponent(AllPatientsListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    location = TestBed.get(Location);
    viewBtn = fixture.nativeElement.querySelector('#view');
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should call getAllPatientsList method when page loads ',() => {
  	spyOn(dataService,'getAllPatientsList').and.callThrough();
  	component.ngOnInit();
  	expect(dataService.getAllPatientsList).toHaveBeenCalled();
  });

  it('should call view method with the id of selected patient', fakeAsync(() => {
  	spyOn(component, 'view').and.callThrough();
    spyOn(dataService,'getAllPatientsList').and.returnValue(of(mockPatientDetails));
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    expect(component.view).toHaveBeenCalledWith('5fedcf3f-72aa-48fb-927a-492003779e07');
  }));

  it('should navigate to patientList page with selected patientId : case 1', fakeAsync(() => {
  	spyOn(component, 'view').and.callThrough();
    spyOn(dataService,'getAllPatientsList').and.returnValue(of(mockPatientDetails));
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    expect(component.view).toHaveBeenCalledWith("5fedcf3f-72aa-48fb-927a-492003779e07");
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/patientList/5fedcf3f-72aa-48fb-927a-492003779e07');
    });
  }));

  it('should navigate to patientList page with selected patientId : case 2', fakeAsync(() => {
  	spyOn(component, 'view').and.callThrough();
    spyOn(dataService,'getAllPatientsList').and.returnValue(of(patientList2));
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    expect(component.view).toHaveBeenCalledWith('5d8fb22e1d9d0652ef4781ad');
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/patientList/5d8fb22e1d9d0652ef4781ad');
    });
  }));

});
