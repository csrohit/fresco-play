import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { HttpModule } from '@angular/http';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';

import { Users } from '../../models/users.model';
import { DataService } from '../../services/data.service';

const user = new Users();
user.username = 'test';
user.mobile = '1234567890';
user.location = 'testLocation';
user.email = 'test@test.com';
user.userId = 1;

class MockDataService {
  getUserId(): number {
    return -1;
  }
  getUserDetails(userId: number): Observable<Users> {
    return of(new Users);
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;
  let dataService: DataService;
  const mockStore = {
    "bookDetails": {
    },
    "booksByAuthor": {
    },
    "checkedoutDetails":[],
    "globalCart":[],
    "loggedUser": { "id": 1,"username": "user1" },
    "users": [
      {"id":1,"username":'user1',"password":'Password1!',"books":[]},
      {"id":2,"username":'user2',"password":'Password2@',"books":[]},
      {"id":3,"username":'user3',"password":'Password3#',"books":[]},
      {"id":4,"username":'user4',"password":'Password4$',"books":[]},
      {"id":5,"username":'user5',"password":'Password5%',"books":[]}
    ]
  };

  beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            RouterTestingModule,
            ],
            declarations: [HeaderComponent],
			      providers: [
			        { provide: DataService, useClass: MockDataService }
			      ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
            fixture = TestBed.createComponent(HeaderComponent);
            component = fixture.debugElement.componentInstance;
            dataService = TestBed.get(DataService);
            location = TestBed.get(Location);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });


  it('should get logged user id by default', fakeAsync(() => {
    spyOn(dataService, 'getUserId').and.callThrough();
    fixture.detectChanges();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    	expect(dataService.getUserId).toHaveBeenCalled();
    });
  }));

  it('should get profile details by default', fakeAsync(() => {
    const userId = spyOn(dataService, 'getUserId').and.returnValue(1);
    fixture.detectChanges();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    spyOn(component, 'getProfileDetails').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    	expect(component.getProfileDetails).toHaveBeenCalled();
    });
  }));

  it('should get logged user details', fakeAsync(() => {
    const userId = spyOn(dataService, 'getUserId').and.returnValue(1);
    fixture.detectChanges();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    spyOn(dataService, 'getUserDetails').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    	expect(dataService.getUserDetails).toHaveBeenCalledWith(1);
    });
  }));

});

