import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from '../../services/data.service';
import { AllPatientsListComponent } from './all-patients-list.component';


const patientDetails = {
  'id': 20,
  'firstName': 'test',
  'mobile': 1234567890,
  'gender': 'female',
};
const patientList = [patientDetails];

const patientDetails2 = {
  'id': 17,
  'firstName': 'xxxx',
  'mobile': 9988776655,
  'gender': 'male',
};
const patientList2 = [patientDetails2];

class MockDataService {

  public getAllPatientsList(): Observable<any> {
  	return of(patientList);
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
    path: 'patientList/20',
    component: MockComponent
  },
  {
    path: 'patientList/17',
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
    spyOn(dataService,'getAllPatientsList').and.returnValue(of(patientList));
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    expect(component.view).toHaveBeenCalledWith(20);
  }));

  it('should call view method with the id of selected patient : case 1', fakeAsync(() => {
  	spyOn(component, 'view').and.callThrough();
    spyOn(dataService,'getAllPatientsList').and.returnValue(of(patientList));
    component.ngOnInit();
    fixture.detectChanges();
    viewBtn = fixture.nativeElement.querySelector('#view');
    viewBtn.click();
    fixture.detectChanges();
    expect(component.view).toHaveBeenCalledWith(20);
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/patientList/20');
    });
  }));

  it('should call view method with the id of selected patient : case 2', fakeAsync(() => {
  	spyOn(component, 'view').and.callThrough();
    spyOn(dataService,'getAllPatientsList').and.returnValue(of(patientList2));
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

});
