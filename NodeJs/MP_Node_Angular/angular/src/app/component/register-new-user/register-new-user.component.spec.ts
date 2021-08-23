
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { RegisterNewUserComponent } from './register-new-user.component';
import { DataService } from '../../services/data.service';
import { HttpModule } from '@angular/http';
import { Users } from '../../models/users';

const expectedRes = {status: "success"};

const expectedErrorResponse = {
  status: 404,
  message: 'Not found'
};

class MockDataService {
  public regNewUser(regNewUser): Observable<any> {
    return of(expectedRes);
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
    path: 'register_user',
    component: MockComponent
  }
];

describe('RegisterNewUserComponent', () => {

  let component: RegisterNewUserComponent;
  let fixture: ComponentFixture<RegisterNewUserComponent>;
  let dataService: DataService;
  let location: Location;

  let usernameCtrl: AbstractControl;
  let passwordCtrl: AbstractControl;
  let mobileCtrl: AbstractControl;
  let emailCtrl: AbstractControl;
  let locationCtrl: AbstractControl;

  let errorAlertNoUsername = HTMLElement;
  let errorAlertMinlengthUsername = HTMLElement;
  let errorAlertMaxlengthUsername = HTMLElement;
  let errorAlertPatternUsername = HTMLElement;

  let errorAlertNoPassword = HTMLElement;
  let errorAlertMinlengthPassword = HTMLElement;
  let errorAlertMaxlengthPassword = HTMLElement;
  let errorAlertPatternPassword = HTMLElement;

  let mobileErrMsg = HTMLElement;
  let emailErrMsg = HTMLElement;
  let locationErrMsg = HTMLElement;

  let elemSubmitBtn = HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterNewUserComponent,
        MockComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(mockRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [{provide: DataService, useClass: MockDataService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewUserComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    location = TestBed.get(Location);

    errorAlertNoUsername = fixture.nativeElement.querySelector('#error-no-username');
    errorAlertMinlengthUsername = fixture.nativeElement.querySelector('#error-minlength-username');
    errorAlertMaxlengthUsername = fixture.nativeElement.querySelector('#error-maxlength-username');
    errorAlertPatternUsername = fixture.nativeElement.querySelector('#error-pattern-username');

    errorAlertNoPassword = fixture.nativeElement.querySelector('#error-no-password');
    errorAlertMinlengthPassword = fixture.nativeElement.querySelector('#error-minlength-password');
    errorAlertMaxlengthPassword = fixture.nativeElement.querySelector('#error-maxlength-username');
    errorAlertPatternPassword = fixture.nativeElement.querySelector('#error-pattern-username');

    mobileErrMsg = fixture.nativeElement.querySelector('#error-mobile');
    emailErrMsg = fixture.nativeElement.querySelector('#error-email');
    locationErrMsg = fixture.nativeElement.querySelector('#error-location');

    elemSubmitBtn = fixture.nativeElement.querySelector('#signup');
    
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should navigate to login when clicked on back button', fakeAsync(() => {
    spyOn(component,'goBack').and.callThrough();
    fixture.nativeElement.querySelector('#back').click();
    tick();
    fixture.detectChanges();
    expect(component.goBack).toHaveBeenCalled();
    expect(location.path()).toBe('/login');
  }));

  it('All validation errors should be hidden and form should be invalid by default', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.signupForm.valid).toBeFalsy();

      expect(errorAlertNoUsername).toBeFalsy();
      expect(errorAlertMinlengthUsername).toBeFalsy();
      expect(errorAlertMaxlengthUsername).toBeFalsy();
      expect(errorAlertPatternUsername).toBeFalsy();

      expect(errorAlertNoPassword).toBeFalsy();
      expect(errorAlertMinlengthPassword).toBeFalsy();
      expect(errorAlertMaxlengthPassword).toBeFalsy();
      expect(errorAlertPatternPassword).toBeFalsy();

      expect(mobileErrMsg).toBeFalsy();
      expect(emailErrMsg).toBeFalsy();
      expect(locationErrMsg).toBeFalsy();
    });

  }));

  it('should display no username validation error when the field kept as null(dirty)', () => {

    fixture.whenStable().then(fakeAsync(() => {
      usernameCtrl = component.signupForm.controls['userName'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput.value = '';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.signupForm.valid).toBeFalsy();
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
      usernameCtrl = component.signupForm.controls['userName'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput.value = 'a';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.signupForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      expect(usernameCtrl.valid).toBeFalsy();
      errorAlertMinlengthUsername = fixture.nativeElement.querySelector('#error-minlength-username');

      expect(errorAlertMinlengthUsername).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-minlength-username')
        .textContent.trim()).toBe('User name must be at least 3 characters long');
    }));

  });

  it('should display maxlength 20 username validation error when the username length greater than 20', () => {

    fixture.whenStable().then(fakeAsync(() => {
      usernameCtrl = component.signupForm.controls['userName'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput.value = 'qwertyuiopasdfghjklzxcvb23';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.signupForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      expect(usernameCtrl.valid).toBeFalsy();
      errorAlertMaxlengthUsername = fixture.nativeElement.querySelector('#error-maxlength-username');

      expect(errorAlertMaxlengthUsername).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-maxlength-username')
        .textContent.trim()).toBe('Username cannot exceed 20 characters');
    }));

  });

  it('should display username pattern validation error', () => {

    fixture.whenStable().then(fakeAsync(() => {
      usernameCtrl = component.signupForm.controls['userName'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput.value = 'qwertyuiop!23@';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.signupForm.valid).toBeFalsy();
      tick();
      fixture.detectChanges();
      expect(usernameCtrl.valid).toBeFalsy();
      errorAlertPatternUsername = fixture.nativeElement.querySelector('#error-pattern-username');

      expect(errorAlertPatternUsername).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-pattern-username')
        .textContent.trim()).toBe('Username should be in alphanumeric only');
    }));

  });

  it('should not display any error when the username field is valid', () => {

    fixture.whenStable().then(fakeAsync(() => {
      usernameCtrl = component.signupForm.controls['userName'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput.value = 'xxx12';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      errorAlertNoUsername = fixture.nativeElement.querySelector('#error-no-username');
      errorAlertMinlengthUsername = fixture.nativeElement.querySelector('#error-minlength-username');
      errorAlertMaxlengthUsername = fixture.nativeElement.querySelector('#error-maxlength-username');
      errorAlertPatternUsername = fixture.nativeElement.querySelector('#error-pattern-username');
      expect(fixture.nativeElement.querySelector('input[formControlName=userName]')).toBeTruthy();
      expect(usernameCtrl.valid).toBeTruthy();
      expect(errorAlertNoUsername).toBeFalsy();
      expect(errorAlertMinlengthUsername).toBeFalsy();
      expect(errorAlertMaxlengthUsername).toBeFalsy();
      expect(errorAlertPatternUsername).toBeFalsy();
    }));

  });

  it('should display no password validation error when the field kept as null(dirty)', () => {

    fixture.whenStable().then(fakeAsync(() => {
      passwordCtrl = component.signupForm.controls['password'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput.value = '';
      elemInput.dispatchEvent(new Event('input'));
      expect(component.signupForm.valid).toBeFalsy();
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
      passwordCtrl = component.signupForm.controls['password'];
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

  it('should display maxlength 20 password validation error when the password length greater less than 20', () => {

    fixture.whenStable().then(fakeAsync(() => {
      passwordCtrl = component.signupForm.controls['password'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput.value = 'xxxsdggfgfasqwajkyukhcbncvn';
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
      passwordCtrl = component.signupForm.controls['password'];
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
      passwordCtrl = component.signupForm.controls['password'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput.value = 'Saravana1$';
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

  it('should display mobile pattern validation error', () => {

    fixture.whenStable().then(fakeAsync(() => {
      mobileCtrl = component.signupForm.controls['mobile'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#mobile');
      elemInput.value = '990088';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      mobileErrMsg = fixture.nativeElement.querySelector('#error-mobile');
      expect(mobileCtrl.valid).toBeFalsy();
      expect(mobileErrMsg).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-mobile')
        .textContent.trim()).toBe('You must enter a valid mobile number');
    }));

  });

  it('should not display mobile error when the mobile field is valid', () => {
    fixture.whenStable().then(fakeAsync(() => {
      mobileCtrl = component.signupForm.controls['mobile'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#mobile');
      elemInput.value = '9900880077';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      mobileErrMsg = fixture.nativeElement.querySelector('#error-mobile');
      expect(fixture.nativeElement.querySelector('input[formControlName=mobile]')).toBeTruthy();
      expect(mobileCtrl.valid).toBeTruthy();
      expect(mobileErrMsg).toBeFalsy();
    }));
  });

  it('should display email pattern validation error', () => {

    fixture.whenStable().then(fakeAsync(() => {
      emailCtrl = component.signupForm.controls['email'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
      elemInput.value = 'sd.dss@sf.';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      emailErrMsg = fixture.nativeElement.querySelector('#error-email');
      expect(emailCtrl.valid).toBeFalsy();
      expect(emailErrMsg).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-email')
        .textContent.trim()).toBe('You must enter a valid Email ID');
    }));

  });

  it('should not display email validation error when the email field is valid', () => {
    fixture.whenStable().then(fakeAsync(() => {
      emailCtrl = component.signupForm.controls['email'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
      elemInput.value = 'sd.dss@sf.in';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      emailErrMsg = fixture.nativeElement.querySelector('#error-email');
      expect(fixture.nativeElement.querySelector('input[formControlName=email]')).toBeTruthy();
      expect(emailCtrl.valid).toBeTruthy();
      expect(emailErrMsg).toBeFalsy();
    }));
  });

  it('should display location validation error when the field kept as null(dirty)', () => {

    fixture.whenStable().then(fakeAsync(() => {
      locationCtrl = component.signupForm.controls['location'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#location');
      elemInput.value = '';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      locationErrMsg = fixture.nativeElement.querySelector('#error-location');
      expect(locationCtrl.valid).toBeFalsy();
      expect(locationErrMsg).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#error-location')
        .textContent.trim()).toBe('You must enter the location');
    }));

  });

  it('should not display location validation error when the location field is valid', () => {
    fixture.whenStable().then(fakeAsync(() => {
      locationCtrl = component.signupForm.controls['location'];
      const elemInput: HTMLInputElement = fixture.nativeElement.querySelector('#location');
      elemInput.value = 'xxxxxxx';
      elemInput.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      locationErrMsg = fixture.nativeElement.querySelector('#error-location');
      expect(fixture.nativeElement.querySelector('input[formControlName=location]')).toBeTruthy();
      expect(locationCtrl.valid).toBeTruthy();
      expect(locationErrMsg).toBeFalsy();
    }));
  });

  it('should enable Create Account button(form valid) when all fields are valid', () => {
    fixture.whenStable().then(fakeAsync(() => {

      usernameCtrl = component.signupForm.controls['userName'];
      const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput1.value = 'yyy12';
      elemInput1.dispatchEvent(new Event('input'));

      passwordCtrl = component.signupForm.controls['password'];
      const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput2.value = 'Xxxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));

      mobileCtrl = component.signupForm.controls['mobile'];
      const elemInput3: HTMLInputElement = fixture.nativeElement.querySelector('#mobile');
      elemInput3.value = '9900880044';
      elemInput3.dispatchEvent(new Event('input'));

      emailCtrl = component.signupForm.controls['email'];
      const elemInput4: HTMLInputElement = fixture.nativeElement.querySelector('#email');
      elemInput4.value = 'xxx@yy.in';
      elemInput4.dispatchEvent(new Event('input'));

      locationCtrl = component.signupForm.controls['location'];
      const elemInput5: HTMLInputElement = fixture.nativeElement.querySelector('#location');
      elemInput5.value = 'zzzzz';
      elemInput5.dispatchEvent(new Event('input'));

      tick();
      fixture.detectChanges();
      errorAlertNoUsername = fixture.nativeElement.querySelector('#error-no-username');
      errorAlertMinlengthUsername = fixture.nativeElement.querySelector('#error-minlength-username');
      errorAlertMaxlengthUsername = fixture.nativeElement.querySelector('#error-maxlength-username');
      errorAlertPatternUsername = fixture.nativeElement.querySelector('#error-pattern-username');
      errorAlertNoPassword = fixture.nativeElement.querySelector('#error-no-password');
      errorAlertMinlengthPassword = fixture.nativeElement.querySelector('#error-minlength-password');
      errorAlertMaxlengthPassword = fixture.nativeElement.querySelector('#error-maxlength-username');
      errorAlertPatternPassword = fixture.nativeElement.querySelector('#error-pattern-username');
      mobileErrMsg = fixture.nativeElement.querySelector('#error-mobile');
      emailErrMsg = fixture.nativeElement.querySelector('#error-email');
      locationErrMsg = fixture.nativeElement.querySelector('#error-location');

      expect(fixture.nativeElement.querySelector('input[formControlName=userName]')).toBeTruthy();
      expect(usernameCtrl.valid).toBeTruthy();
      expect(errorAlertNoUsername).toBeFalsy();
      expect(errorAlertMinlengthUsername).toBeFalsy();
      expect(errorAlertMaxlengthUsername).toBeFalsy();
      expect(errorAlertPatternUsername).toBeFalsy();
      expect(fixture.nativeElement.querySelector('input[formControlName=password]')).toBeTruthy();
      expect(passwordCtrl.valid).toBeTruthy();
      expect(errorAlertNoPassword).toBeFalsy();
      expect(errorAlertMinlengthPassword).toBeFalsy();
      expect(errorAlertMaxlengthPassword).toBeFalsy();
      expect(errorAlertPatternPassword).toBeFalsy();
      expect(fixture.nativeElement.querySelector('input[formControlName=mobile]')).toBeTruthy();
      expect(mobileCtrl.valid).toBeTruthy();
      expect(mobileErrMsg).toBeFalsy();
      expect(fixture.nativeElement.querySelector('input[formControlName=email]')).toBeTruthy();
      expect(emailCtrl.valid).toBeTruthy();
      expect(emailErrMsg).toBeFalsy();
      expect(fixture.nativeElement.querySelector('input[formControlName=location]')).toBeTruthy();
      expect(locationCtrl.valid).toBeTruthy();
      expect(locationErrMsg).toBeFalsy();
      expect(component.signupForm.valid).toBeTruthy();

    }));
  });


  it('should call signUp method when all fields are valid', fakeAsync(() => {

    spyOn(component, 'signUp').and.callThrough();
    spyOn(dataService,'regNewUser').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput1.value = 'yyy12';
      elemInput1.dispatchEvent(new Event('input'));

      const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput2.value = 'Xxxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));

      const elemInput3: HTMLInputElement = fixture.nativeElement.querySelector('#mobile');
      elemInput3.value = '9900880044';
      elemInput3.dispatchEvent(new Event('input'));

      const elemInput4: HTMLInputElement = fixture.nativeElement.querySelector('#email');
      elemInput4.value = 'xxx@yy.in';
      elemInput4.dispatchEvent(new Event('input'));

      const elemInput5: HTMLInputElement = fixture.nativeElement.querySelector('#location');
      elemInput5.value = 'zzzzz';
      elemInput5.dispatchEvent(new Event('input'));


      fixture.detectChanges();
      fixture.nativeElement.querySelector('#signup').click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.signUp).toHaveBeenCalled();
        expect(dataService.regNewUser).toHaveBeenCalled();
      });
    });    
  }));

  it('should redirect to login page after successful registration', fakeAsync(() => {

    spyOn(component, 'signUp').and.callThrough();
    spyOn(dataService,'regNewUser').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput1.value = 'yyy12';
      elemInput1.dispatchEvent(new Event('input'));

      const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput2.value = 'Xxxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));

      const elemInput3: HTMLInputElement = fixture.nativeElement.querySelector('#mobile');
      elemInput3.value = '9900880044';
      elemInput3.dispatchEvent(new Event('input'));

      const elemInput4: HTMLInputElement = fixture.nativeElement.querySelector('#email');
      elemInput4.value = 'xxx@yy.in';
      elemInput4.dispatchEvent(new Event('input'));

      const elemInput5: HTMLInputElement = fixture.nativeElement.querySelector('#location');
      elemInput5.value = 'zzzzz';
      elemInput5.dispatchEvent(new Event('input'));


      fixture.detectChanges();
      fixture.nativeElement.querySelector('#signup').click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('/login');
      });
    });    
  }));

  it('should not redirect to login page on occurence of error', fakeAsync(() => {

    spyOn(component, 'signUp').and.callThrough();
    spyOn(dataService,'regNewUser').and.returnValue(Observable.throw(expectedErrorResponse));
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
      elemInput1.value = 'yyy12';
      elemInput1.dispatchEvent(new Event('input'));

      const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
      elemInput2.value = 'Xxxxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));

      const elemInput3: HTMLInputElement = fixture.nativeElement.querySelector('#mobile');
      elemInput3.value = '9900880044';
      elemInput3.dispatchEvent(new Event('input'));

      const elemInput4: HTMLInputElement = fixture.nativeElement.querySelector('#email');
      elemInput4.value = 'xxx@yy.in';
      elemInput4.dispatchEvent(new Event('input'));

      const elemInput5: HTMLInputElement = fixture.nativeElement.querySelector('#location');
      elemInput5.value = 'zzzzz';
      elemInput5.dispatchEvent(new Event('input'));


      fixture.detectChanges();
      fixture.nativeElement.querySelector('#signup').click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('');
      });
    });    
  }));

  it('navigate to login page when clicked on back button', () => {
    fixture.whenStable().then(fakeAsync(() => {
      fixture.nativeElement.querySelector('#back').click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('/login');
      });
    }));
  });

});

