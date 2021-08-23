import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { AllPatientsListComponent } from './all-patients-list.component';


const mockPatientDetails = [
  {
  "_id": "5d8e150b3768ab34dc7e607c",
  "fname": "nelson",
  "lname": "great",
  "gender": "Male",
  "dob": "2019-09-21T00:00:00.000Z",
  "mobile": 9898999999,
  "email": "nelson@abc.in",
  "desc": "nothing",
  "userId": "5d8e0c843768ab34dc7e607a",
  "createdAt": "2019-09-27T13:56:27.448Z",
  "updatedAt": "2019-09-27T13:56:27.448Z"
  },
  {
  "_id": "5d8fb22e1d9d0652ef4781ad",
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
  }
];

const patientList2 = [
  {
  "_id": "5d8fb22e1d9d0652ef4781ad",
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
    path: 'patientList/5d8e150b3768ab34dc7e607c',
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
    expect(component.view).toHaveBeenCalledWith('5d8e150b3768ab34dc7e607c');
  }));

  it('should navigate to patientList page with selected patientId : case 1', fakeAsync(() => {
  	spyOn(component, 'view').and.callThrough();
    spyOn(dataService,'getAllPatientsList').and.returnValue(of(mockPatientDetails));
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    expect(component.view).toHaveBeenCalledWith("5d8e150b3768ab34dc7e607c");
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/patientList/5d8e150b3768ab34dc7e607c');
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
