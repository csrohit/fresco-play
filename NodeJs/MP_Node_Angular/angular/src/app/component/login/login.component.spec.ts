import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { DataService } from '../../services/data.service';
import { LoginComponent } from './login.component';
import * as alertify from 'alertify.js';


const expectedErrorResponse = {
  status: 404,
  message: 'Not found'
};

class MockDataService {
  authenticateUser(username: string, password: string): Observable<boolean> {
    return of(false);
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
    path: 'profile',
    component: MockComponent
  },
  {
    path: 'register_user',
    component: MockComponent
  }
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dataService: DataService;
  let location: Location;
  const isLoggedIn = false;
  let usernameCtrl: AbstractControl;
  let passwordCtrl: AbstractControl;
  let errorAlertNoUsername = HTMLElement;
  let errorAlertNoPassword = HTMLElement;
  let errorAlertMinlengthUsername = HTMLElement;
  let errorAlertMinlengthPassword = HTMLElement;
  let errorAlertMaxlengthUsername = HTMLElement;
  let errorAlertMaxlengthPassword = HTMLElement;
  let errorAlertPatternUsername = HTMLElement;
  let errorAlertPatternPassword = HTMLElement;
  let elemSubmitBtn = HTMLElement;
  let errorAlertUnauth = HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        MockComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(mockRoutes),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    location = TestBed.get(Location);

    errorAlertNoUsername = fixture.nativeElement.querySelector('#error-no-username');
    errorAlertNoPassword = fixture.nativeElement.querySelector('#error-no-password');
    errorAlertMinlengthUsername = fixture.nativeElement.querySelector('#error-minlength-username');
    errorAlertMinlengthPassword = fixture.nativeElement.querySelector('#error-minlength-password');
    errorAlertMaxlengthUsername = fixture.nativeElement.querySelector('#error-maxlength-username');
    errorAlertMaxlengthPassword = fixture.nativeElement.querySelector('#error-maxlength-password');
    errorAlertPatternUsername = fixture.nativeElement.querySelector('#error-pattern-username');
    errorAlertPatternPassword = fixture.nativeElement.querySelector('#error-pattern-password');
    elemSubmitBtn = fixture.nativeElement.querySelector('#loginBtn');
    errorAlertUnauth = fixture.nativeElement.querySelector('#error-unauthorised-user');

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
  });

  it('All validation errors should be hidden and form should be invalid by default', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loginForm.valid).toBeFalsy();
      expect(errorAlertNoUsername).toBeFalsy();
      expect(errorAlertNoPassword).toBeFalsy();
      expect(errorAlertMinlengthUsername).toBeFalsy();
      expect(errorAlertMinlengthPassword).toBeFalsy();
      expect(errorAlertMaxlengthUsername).toBeFalsy();
      expect(errorAlertMaxlengthPassword).toBeFalsy();
      expect(errorAlertPatternUsername).toBeFalsy();
      expect(errorAlertPatternPassword).toBeFalsy();
    });

  }));

  it('should display no username validation error when the field kept as null(dirty)', () => {

    fixture.whenStable().then(fakeAsync(() => {
      usernameCtrl = component.loginForm.controls['userName'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput.value = '';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.loginForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertNoUsername = fixture.nativeElement.querySelector('#error-no-username');
      expect(usernameCtrl.valid).toBeFalsy();
      expect(errorAlertNoUsername).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-no-username').textContent.trim()).toBe('You must enter a username');
    }));

  });

  it('should display minlength 3 username validation error when the username length less than 3', () => {

    fixture.whenStable().then(fakeAsync(() => {
      usernameCtrl = component.loginForm.controls['userName'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput.value = 'a';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.loginForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      expect(usernameCtrl.valid).toBeFalsy();
      errorAlertMinlengthUsername = fixture.nativeElement.querySelector('#error-minlength-username');

      expect(errorAlertMinlengthUsername).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-minlength-username')
        .textContent.trim()).toBe('User name must be at least 3 characters long');
    }));

  });

  it('should display maxlength username validation error when the username length greater than 20', () => {

    fixture.whenStable().then(fakeAsync(() => {
      usernameCtrl = component.loginForm.controls['userName'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput.value = 'aqqeiukncsknmsncmxnmknknmmgdgdggdgdg';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.loginForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      expect(usernameCtrl.valid).toBeFalsy();
      errorAlertMaxlengthUsername = fixture.nativeElement.querySelector('#error-maxlength-username');

      expect(errorAlertMaxlengthUsername).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-maxlength-username')
        .textContent.trim()).toBe('Username cannot exceed 20 characters');
    }));

  });

  it('should not display any error when the username field is valid', () => {

    fixture.whenStable().then(fakeAsync(() => {
      usernameCtrl = component.loginForm.controls['userName'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput.value = 'xxx';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      errorAlertNoUsername = fixture.nativeElement.querySelector('#error-no-username');
      errorAlertMinlengthUsername = fixture.nativeElement.querySelector('#error-minlength-username');
      expect(fixture.nativeElement.querySelector('input[formControlName=userName]')).toBeTruthy();
      expect(usernameCtrl.valid).toBeTruthy();
      expect(errorAlertNoUsername).toBeFalsy();
      expect(errorAlertMinlengthUsername).toBeFalsy();
      expect(errorAlertMaxlengthUsername).toBeFalsy();
    }));

  });

  it('should display no password validation error when the field kept as null(dirty)', () => {

    fixture.whenStable().then(fakeAsync(() => {
      passwordCtrl = component.loginForm.controls['password'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput.value = '';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.loginForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      errorAlertNoPassword = fixture.nativeElement.querySelector('#error-no-password');
      expect(passwordCtrl.valid).toBeFalsy();
      expect(errorAlertNoPassword).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-no-password').textContent.trim()).toBe('You must enter a password');
    }));

  });

  it('should display minlength 8 password validation error when the password length less than 8', () => {

    fixture.whenStable().then(fakeAsync(() => {
      passwordCtrl = component.loginForm.controls['password'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput.value = 'xxx';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      errorAlertMinlengthPassword = fixture.nativeElement.querySelector('#error-minlength-password');
      expect(passwordCtrl.valid).toBeFalsy();
      expect(errorAlertMinlengthPassword).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-minlength-password')
        .textContent.trim()).toBe('Password must be at least 8 characters long');
    }));

  });

  it('should display maxlength password validation error when the password length exceeds 20', () => {

    fixture.whenStable().then(fakeAsync(() => {
      passwordCtrl = component.loginForm.controls['password'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput.value = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      errorAlertMaxlengthPassword = fixture.nativeElement.querySelector('#error-maxlength-password');
      expect(passwordCtrl.valid).toBeFalsy();
      expect(errorAlertMaxlengthPassword).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-maxlength-password')
        .textContent.trim()).toBe('Password cannot exceed 20 characters');
    }));

  });

  it('should display password pattern validation error', () => {

    fixture.whenStable().then(fakeAsync(() => {
      passwordCtrl = component.loginForm.controls['password'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput.value = '@jkyukhcbncvn()';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      errorAlertPatternPassword = fixture.nativeElement.querySelector('#error-pattern-password');
      expect(passwordCtrl.valid).toBeFalsy();
      expect(errorAlertPatternPassword).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-pattern-password')
        .textContent.trim()).toBe('Pattern does not match');
    }));

  });

  it('should not display password error when the password field is valid', () => {
    fixture.whenStable().then(fakeAsync(() => {
      passwordCtrl = component.loginForm.controls['password'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput.value = 'Xxxxxxxx1$';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      errorAlertNoPassword = fixture.nativeElement.querySelector('#error-no-password');
      errorAlertMinlengthPassword = fixture.nativeElement.querySelector('#error-minlength-password');
      errorAlertMaxlengthPassword = fixture.nativeElement.querySelector('#error-maxlength-password');
      errorAlertPatternPassword = fixture.nativeElement.querySelector('#error-pattern-password');
      expect(fixture.nativeElement.querySelector('input[formControlName=password]')).toBeTruthy();
      expect(passwordCtrl.valid).toBeTruthy();
      expect(errorAlertNoPassword).toBeFalsy();
      expect(errorAlertMinlengthPassword).toBeFalsy();
      expect(errorAlertMaxlengthPassword).toBeFalsy();
      expect(errorAlertPatternPassword).toBeFalsy();
    }));
  });

  it('should enable login button(form valid) when both field are valid', () => {
    fixture.whenStable().then(fakeAsync(() => {
      usernameCtrl = component.loginForm.controls['userName'];
      const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput1.value = 'xxx12';
      elemInput1.dispatchEvent(new Event('input'));
      passwordCtrl = component.loginForm.controls['password'];
      const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput2.value = 'Xxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      errorAlertNoUsername = fixture.nativeElement.querySelector('#error-no-username');
      errorAlertMinlengthUsername = fixture.nativeElement.querySelector('#error-minlength-username');
      errorAlertMaxlengthUsername = fixture.nativeElement.querySelector('#error-maxlength-username');
      errorAlertNoPassword = fixture.nativeElement.querySelector('#error-no-password');
      errorAlertMinlengthPassword = fixture.nativeElement.querySelector('#error-minlength-password');
      errorAlertMaxlengthPassword = fixture.nativeElement.querySelector('#error-maxlength-password');
      errorAlertPatternPassword = fixture.nativeElement.querySelector('#error-pattern-password');
      expect(fixture.nativeElement.querySelector('input[formControlName=userName]')).toBeTruthy();
      expect(usernameCtrl.valid).toBeTruthy();
      expect(errorAlertNoUsername).toBeFalsy();
      expect(errorAlertMinlengthUsername).toBeFalsy();
      expect(errorAlertMaxlengthUsername).toBeFalsy();
      expect(fixture.nativeElement.querySelector('input[formControlName=password]')).toBeTruthy();
      expect(passwordCtrl.valid).toBeTruthy();
      expect(errorAlertNoPassword).toBeFalsy();
      expect(errorAlertMinlengthPassword).toBeFalsy();
      expect(errorAlertMaxlengthPassword).toBeFalsy();
      expect(errorAlertPatternPassword).toBeFalsy();
      expect(component.loginForm.valid).toBeTruthy();

    }));
  });


  it('should hide validation messages and call login method from authservice for valid credentials', fakeAsync(() => {
    spyOn(component, 'doLogin').and.callThrough();
    spyOn(dataService, 'authenticateUser').and.callThrough();
    tick();
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput1.value = 'xxx';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Xxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      expect(component.loginForm.valid).toBeTruthy();
      fixture.nativeElement.querySelector('#loginBtn').click();
      tick();
      fixture.detectChanges();
      tick();
      expect(component.doLogin).toHaveBeenCalled();
      expect(dataService.authenticateUser).toHaveBeenCalledWith('xxx', 'Xxxxxxxx1$');
      errorAlertNoUsername = fixture.nativeElement.querySelector('#error-no-username');
      errorAlertMinlengthUsername = fixture.nativeElement.querySelector('#error-minlength-username');
      errorAlertNoPassword = fixture.nativeElement.querySelector('#error-no-password');
      errorAlertMinlengthPassword = fixture.nativeElement.querySelector('#error-minlength-password');
      expect(errorAlertNoUsername).toBeFalsy();
      expect(errorAlertMinlengthUsername).toBeFalsy();
      expect(errorAlertNoPassword).toBeFalsy();
      expect(errorAlertMinlengthPassword).toBeFalsy();
    });
  }));

  it('should redirect to profile page on correct credentials', fakeAsync(() => {
    component.ngOnInit();
    spyOn(dataService, 'authenticateUser').and.returnValue(of(true));
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    spyOn(component, 'doLogin').and.callThrough();
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput1.value = 'xxx';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Xxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#loginBtn').click();
      fixture.detectChanges();
      expect(component.doLogin).toHaveBeenCalled();
      fixture.detectChanges();
      expect(dataService.authenticateUser).toHaveBeenCalledWith('xxx', 'Xxxxxxxx1$');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('/profile');
      });
    });
  }));

  it('should not redirect to other pages on incorrect credentials', fakeAsync(() => {
    component.ngOnInit();
    spyOn(dataService, 'authenticateUser').and.callThrough();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    spyOn(component, 'doLogin').and.callThrough();
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput1.value = 'xxx';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Xxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#loginBtn').click();
      fixture.detectChanges();
      expect(component.doLogin).toHaveBeenCalled();
      fixture.detectChanges();
      expect(dataService.authenticateUser).toHaveBeenCalledWith('xxx', 'Xxxxxxxx1$');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('');
      });
    });
  }));

  it('should not redirect to other pages on occurence of error', fakeAsync(() => {
    component.ngOnInit();
    spyOn(dataService, 'authenticateUser').and.returnValue(Observable.throw(expectedErrorResponse));
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    spyOn(component, 'doLogin').and.callThrough();
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput1.value = 'xxx';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Xxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.loginForm.valid).toBeTruthy();
      fixture.nativeElement.querySelector('#loginBtn').click();
      fixture.detectChanges();
      expect(component.doLogin).toHaveBeenCalled();
      fixture.detectChanges();
      expect(dataService.authenticateUser).toHaveBeenCalledWith('xxx', 'Xxxxxxxx1$');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('');
      });
    });
  }));

  it('#dologin should return false if form is invalid', () => {
    component.doLogin();
    expect(component.loginForm.valid).toBeFalsy();
    spyOn(component, 'doLogin').and.callThrough();
    fixture.nativeElement.querySelector('#loginBtn').click();
    expect(component.doLogin).not.toHaveBeenCalled();
  });

  it('clear localStorage if any, when login', fakeAsync(() => {
    component.ngOnInit();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('uid','abc123efg');
  	localStorage.setItem('token','abc123efg');
    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemInput1.value = 'xxx';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Xxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#loginBtn').click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
      	expect(localStorage.getItem('uid')).toBeNull();
      	expect(localStorage.getItem('token')).toBeNull();
      });
    });
  }));


  it('should navigate to register-new-user page when clicked on "sign up" button', fakeAsync(() => {
    const eleGuestUserButton = fixture.nativeElement.querySelector('#signupBtn');
    eleGuestUserButton.click();
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/register_user');
  }));


});

