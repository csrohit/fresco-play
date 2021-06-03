import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Users } from '../../models/users.model';
import { DataService } from '../../services/data.service';
import { ProfileComponent } from './profile.component';

const errorResponse = new HttpErrorResponse({
  error: 'test 404 error',
  status: 404, statusText: 'Not Found'
});

class MockDataService {
  getUserId(): number {
    return -1;
  }
  getUserDetails(userId: number): Observable<Users> {
    const user = new Users;
    user.username = 'test';
    user.location = 'testLocation';
    user.mobile = '1234567890';
    user.email = 'test@test.com';
    return of(user);
  }
  updateProfile(userDetails): Observable<boolean> {
    return of(false);
  }
}
@Component({
  selector: 'app-mock',
  template: ``
})
class MockComponent { }


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let dataService: DataService;
  let fixture: ComponentFixture<ProfileComponent>;

  let elemEditProfileBtn: HTMLElement;
  let elemEditDiscardBtn: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        MockComponent
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule
      ],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);

    elemEditProfileBtn = fixture.nativeElement.querySelector('#editProfileBtn');
    elemEditDiscardBtn = fixture.nativeElement.querySelector('#editDiscardBtn');

    fixture.detectChanges();
  });


  it('should display profile details on load', fakeAsync(() => {
    const userId = spyOn(dataService, 'getUserId').and.returnValue(1);
    fixture.detectChanges();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getProfileDetails').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      elemEditProfileBtn = fixture.nativeElement.querySelector('#editProfileBtn');
      const elemProfileDetails = fixture.nativeElement.querySelector('#profileDetails');
      component.ngOnInit();
      expect(component.getProfileDetails).toHaveBeenCalled();
      fixture.detectChanges();

      expect(elemEditProfileBtn).not.toBeNull();
      expect(elemProfileDetails).not.toBeNull();
      expect(component.editProfile).toBe(false);
      fixture.detectChanges();
      const usernameEl = fixture.nativeElement.querySelector('#usernameVal');
      const mobileEl = fixture.nativeElement.querySelector('#mobileVal');
      const emailEl = fixture.nativeElement.querySelector('#emailVal');
      const locationEl = fixture.nativeElement.querySelector('#locationVal');
      fixture.detectChanges();

      expect(usernameEl.textContent.trim()).toEqual('test');
      expect(mobileEl.textContent.trim()).toEqual('1234567890');
      expect(emailEl.textContent.trim()).toEqual('test@test.com');
      expect(locationEl.textContent.trim()).toEqual('testLocation');
    });

  }));

  it('should display edit profile form on edit profile button click', () => {

    elemEditProfileBtn = fixture.nativeElement.querySelector('#editProfileBtn');
    fixture.detectChanges();
    spyOn(component, 'editMyProfile').and.callThrough();
    elemEditProfileBtn.click();
    expect(component.editMyProfile).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.editProfile).toBe(true);
    const elemEditProfileForm = fixture.nativeElement.querySelector('#editProfileForm');
    const elemProfileDetails = fixture.nativeElement.querySelector('#profileDetails');
    fixture.detectChanges();
    expect(elemEditProfileForm).not.toBeNull();
    expect(elemProfileDetails).toBeNull();
  });

  it('should display profile details on clicking discard button', () => {
    component.editProfile = true;
    fixture.detectChanges();
    elemEditProfileBtn = fixture.nativeElement.querySelector('#editProfileBtn');
    elemEditDiscardBtn = fixture.nativeElement.querySelector('#editDiscardBtn');

    expect(elemEditProfileBtn).toBeNull();
    expect(elemEditDiscardBtn).not.toBeNull();

    spyOn(component, 'discardEdit').and.callThrough();
    elemEditDiscardBtn.click();
    expect(component.discardEdit).toHaveBeenCalled();
    fixture.detectChanges();

    expect(component.editProfile).toBe(false);
    const elemEditProfileForm = fixture.nativeElement.querySelector('#editProfileForm');
    const elemProfileDetails = fixture.nativeElement.querySelector('#profileDetails');
    fixture.detectChanges();

    expect(elemEditProfileForm).toBeNull();
    expect(elemProfileDetails).not.toBeNull();
  });

  it('should validate the edit profile form', () => {
    component.editProfile = true;
    fixture.detectChanges();
    elemEditProfileBtn = fixture.nativeElement.querySelector('#editProfileBtn');
    elemEditDiscardBtn = fixture.nativeElement.querySelector('#editDiscardBtn');
    const elemEditProfileForm = fixture.nativeElement.querySelector('#editProfileForm');
    const elemProfileDetails = fixture.nativeElement.querySelector('#profileDetails');
    fixture.detectChanges();

    expect(elemEditProfileBtn).toBeNull();
    expect(elemEditDiscardBtn).not.toBeNull();

    expect(elemEditProfileForm).not.toBeNull();
    expect(elemProfileDetails).toBeNull();

    expect(component.editProfileForm.valid).toBeFalsy();

    component.editProfileForm.controls['mobile'].setValue('1234567890');
    component.editProfileForm.controls['userName'].setValue('test');
    component.editProfileForm.controls['email'].setValue('test@test.com');
    component.editProfileForm.controls['location'].setValue('testLocation');
    fixture.detectChanges();
    expect(component.editProfileForm.valid).toBeTruthy();
    component.editProfileForm.controls['mobile'].setValue('12345678901');
    fixture.detectChanges();
    expect(component.editProfileForm.valid).toBeFalsy();
    component.editProfileForm.controls['userName'].setValue('');
    fixture.detectChanges();
    expect(component.editProfileForm.valid).toBeFalsy();

    component.editProfileForm.controls['email'].setValue('test@.com');
    fixture.detectChanges();
    expect(component.editProfileForm.valid).toBeFalsy();
    component.editProfileForm.controls['location'].setValue('');
    fixture.detectChanges();
    expect(component.editProfileForm.valid).toBeFalsy();
  });

  it('should populate form fields with values on edit profile button click', fakeAsync(() => {
    const userId = spyOn(dataService, 'getUserId').and.returnValue(1);

    fixture.detectChanges();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getProfileDetails').and.callThrough();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      elemEditProfileBtn = fixture.nativeElement.querySelector('#editProfileBtn');
      fixture.detectChanges();

      elemEditProfileBtn.click();
      fixture.detectChanges();

      elemEditDiscardBtn = fixture.nativeElement.querySelector('#editDiscardBtn');
      const elemEditProfileForm = fixture.nativeElement.querySelector('#editProfileForm');

      expect(elemEditDiscardBtn).not.toBeNull();
      expect(elemEditProfileForm).not.toBeNull();

      expect(component.editProfileForm.controls['userName'].value).toEqual('test');
      expect(component.editProfileForm.controls['mobile'].value).toEqual('1234567890');
      expect(component.editProfileForm.controls['email'].value).toEqual('test@test.com');
      expect(component.editProfileForm.controls['location'].value).toEqual('testLocation');

    });
  }));

  it('should submit profile changes with validation', fakeAsync(() => {
    const userId = spyOn(dataService, 'getUserId').and.returnValue(1);
    const updateProfileResponse = spyOn(dataService, 'updateProfile').and.returnValue(of(true));
    fixture.detectChanges();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

    spyOn(component, 'changeMyProfile').and.callThrough();
    spyOn(component, 'getProfileDetails').and.callThrough();
    spyOn(component, 'discardEdit').and.callThrough();
    tick();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      elemEditProfileBtn = fixture.nativeElement.querySelector('#editProfileBtn');
      fixture.detectChanges();
      elemEditProfileBtn.click();
      fixture.detectChanges();

      component.editProfileForm.controls['userName'].setValue('test');
      component.editProfileForm.controls['mobile'].setValue('1234567890');
      component.editProfileForm.controls['email'].setValue('test@test.com');
      component.editProfileForm.controls['location'].setValue('testLocation');
      expect(component.editProfileForm.valid).toBeTruthy();

      const elemEditSubmitBtn = fixture.nativeElement.querySelector('#editSubmitBtn');
      fixture.detectChanges();
      expect(elemEditSubmitBtn).not.toBeNull();
      elemEditSubmitBtn.click();
      fixture.detectChanges();
      expect(component.changeMyProfile).toHaveBeenCalled();
      tick();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.getProfileDetails).toHaveBeenCalled();
        expect(component.discardEdit).toHaveBeenCalled();
        expect(component.editProfile).toBeFalsy();
      });
    });
  }));

  it('#getProfileDetails should return error on occurence of error', fakeAsync(() => {
    spyOn(dataService, 'getUserDetails').and.returnValue(Observable.throw(errorResponse));
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.userId = 1;
      component.getProfileDetails();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.editProfileForm.controls['userName'].value).toEqual('');
        expect(component.editProfileForm.controls['mobile'].value).toEqual('');
        expect(component.editProfileForm.controls['email'].value).toEqual('');
        expect(component.editProfileForm.controls['location'].value).toEqual('');
      });
    });
  }));


});
