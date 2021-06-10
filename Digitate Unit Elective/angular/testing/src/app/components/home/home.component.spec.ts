import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { Component } from '@angular/core';
@Component({
  selector: 'app-mock',
  template: ``
})
class MockComponent { }
const mockRoutes = [
  {
    path: 'reg',
    component: MockComponent
  }
];
class MockApiService {


  public clearFormValue() {

  }
  public setFormValue() {

  }
  public deleteMember() {
    return of([
      {
        'id': 1,
        'name': 'aad',
        'gender': 'female',
        'dob': '2019-11-08',
        'email': 'abc3@tcs.com',
        'science': 'Science & Technology',
        'fiction': 'Fiction & Non fiction',
        'journals': ''
      },
      {
        'id': 2,
        'name': 'aad',
        'gender': 'female',
        'dob': '2019-11-14',
        'email': 'user11@abc.in',
        'science': 'Science & Technology',
        'fiction': '',
        'journals': ''
      }
    ]);
  }

  public getMembers() {
    return of([
      {
        'id': 1,
        'name': 'aad',
        'gender': 'female',
        'dob': '2019-11-08',
        'email': 'abc3@tcs.com',
        'science': 'Science & Technology',
        'fiction': 'Fiction & Non fiction',
        'journals': ''
      },
      {
        'id': 2,
        'name': 'aad',
        'gender': 'female',
        'dob': '2019-11-14',
        'email': 'user11@abc.in',
        'science': 'Science & Technology',
        'fiction': '',
        'journals': ''
      }
    ]);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: ApiService;
  let location: Location;
  // let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoutes), FormsModule, ReactiveFormsModule],
      declarations: [HomeComponent, MockComponent],
      providers: [{
        provide: ApiService,
        useClass: MockApiService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ApiService);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });

  it('should navigate to register component when calling addNewMember', fakeAsync(() => {
    spyOn(component, 'addNewMember').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#add-member').click();
      tick();
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/reg');
    });
  }));

  it('should execute edit method', fakeAsync(() => {
    spyOn(service, 'setFormValue').and.callThrough();
    spyOn(component, 'edit').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#user-edit').click();
      tick();
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/reg');
    });
  }));

  it('should execute delete method', fakeAsync(() => {
    spyOn(service, 'deleteMember').and.callThrough();
    spyOn(component, 'delete').and.callThrough();
    spyOn(service, 'getMembers').and.callThrough();
    spyOn(component, 'getMembers').and.callThrough();
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#user-delete').click();
      tick();
      tick();
      fixture.detectChanges();
      // expect(location.path()).toBe('/reg');
    });
  }));
});
