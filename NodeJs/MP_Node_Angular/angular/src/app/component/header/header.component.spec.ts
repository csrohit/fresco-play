import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { HttpModule } from '@angular/http';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';

import { Users } from '../../models/users';
import { DataService } from '../../services/data.service';

const mockUserDetails = {
  email: "aquib@abc.com",
  location: "shimla",
  mobile: 7576576577,
  userName: "aquib",
  _id: "7ae2548c8ad985d89f8f9532"
};

const errorResponse ={
  error: 'test 401 error',
  status: 401, statusText: 'Invalid username or password'
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
    path: 'profile',
    component: MockComponent
  },
];

class MockDataService {

  getUserDetails(userId: string): Observable<any> {
    return of(mockUserDetails);
  }

  doLogOut() { }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;
  let dataService: DataService;
  let elemUserName: HTMLElement;
  let elemLogoutButton: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
        	HeaderComponent, MockComponent
  			],
	      imports: [
	        RouterTestingModule.withRoutes(mockRoutes)
	      ],
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

  it('should get profile details by default(when page loads)', fakeAsync(() => {
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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    spyOn(dataService, 'getUserDetails').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    	expect(dataService.getUserDetails).toHaveBeenCalled();
    	elemUserName = fixture.nativeElement.querySelector('#username');
    	expect(elemUserName.innerHTML).toBe('aquib');
    });
  }));

  it('should get error on occurence of error', fakeAsync(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    spyOn(dataService, 'getUserDetails').and.returnValue(Observable.throw(errorResponse))
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    	elemUserName = fixture.nativeElement.querySelector('#username');
    	expect(elemUserName.innerHTML).toBeFalsy();
    });
  }));

  it('should logout when clicked on "logout" menu', fakeAsync(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    spyOn(dataService, 'getUserDetails').and.callThrough();
    spyOn(dataService,'doLogOut').and.callThrough();
    const elemLogoutButton = fixture.nativeElement.querySelector('#logout');
    elemLogoutButton.click();
    tick();
    fixture.detectChanges();
    expect(dataService.doLogOut).toHaveBeenCalled();
  }));

});

