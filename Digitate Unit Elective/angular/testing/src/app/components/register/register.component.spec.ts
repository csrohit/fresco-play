import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';
import { ApiService } from '../../service/api.service';
import { RegisterComponent } from './register.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock',
  template: ``
})
class MockComponent { }
const mockRoutes = [
  {
    path: 'home',
    component: MockComponent
  }
];


class MockApiService {

  public addMember() {
    return of({
      'id': 2,
      'name': 'aad',
      'gender': 'female',
      'dob': '2019-11-14',
      'email': 'user11@abc.in',
      'science': 'Science & Technology',
      'fiction': 'Fiction & Non fiction',
      'journals': ''
    });
  }
  public updateMember() {
    return of({
      'id': 2,
      'name': 'aad',
      'gender': 'female',
      'dob': '2019-11-14',
      'email': 'user11@abc.in',
      'science': 'Science & Technology',
      'fiction': '',
      'journals': ''
    });
  }

  public clearFormValue() {

  }
  public setFormValue() {

  }

  public getFormStatus() {
    return of(true);
  }

  public getFormValue() {
    return of({
      'id': 2,
      'name': 'aad',
      'gender': 'female',
      'dob': '2019-11-14',
      'email': 'user11@abc.in',
      'science': true,
      'fiction': true,
      'journals': true
    });
  }
}
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: ApiService;
  let location: Location;

  // let membershipForm: FormGroup;

  // let idCtrl: FormControl;
  // let nameCtrl: FormControl;
  // let genderCtrl: FormControl;
  // let dobCtrl: FormControl;
  // let emailCtrl: FormControl;
  // let scienceCtrl: FormControl;
  // let fictionCtrl: FormControl;
  // let journalsCtrl: FormControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(mockRoutes), FormsModule, ReactiveFormsModule],
      declarations: [RegisterComponent, MockComponent],
      providers: [{
        provide: ApiService,
        useClass: MockApiService
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ApiService);
    location = TestBed.get(Location);
    // membershipForm = component.membershipForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should submit form: registerform isEdit false', fakeAsync(() => {
    spyOn(component, 'regMembership').and.callThrough();
    spyOn(service, 'clearFormValue');
    spyOn(service, 'updateMember').and.callThrough();
    fixture.whenStable().then(() => {
      const scienceCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#science');
      const fictionCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#fiction');
      const journalsCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#journals');

      expect(scienceCtrl).toBeTruthy();
      expect(fictionCtrl).toBeTruthy();
      expect(journalsCtrl).toBeTruthy();

      expect(scienceCtrl.checked).toBeTruthy();
      expect(fictionCtrl.checked).toBeTruthy();
      expect(journalsCtrl.checked).toBeTruthy();
      fixture.nativeElement.querySelector('#regBtn').click();
      tick();
      tick();
      fixture.nativeElement.querySelector('#regBtn').click();
      tick();
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/home');
    });
  }));
  it('should submit form: registerform isEdit false2', fakeAsync(() => {
    spyOn(component, 'regMembership').and.callThrough();
    spyOn(service, 'clearFormValue');
    spyOn(service, 'updateMember').and.callThrough();
    fixture.whenStable().then(() => {
      const scienceCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#science');
      const fictionCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#fiction');
      const journalsCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#journals');

      expect(scienceCtrl).toBeTruthy();
      expect(fictionCtrl).toBeTruthy();
      expect(journalsCtrl).toBeTruthy();
      expect(scienceCtrl.checked).toBeTruthy();
      expect(fictionCtrl.checked).toBeTruthy();
      expect(journalsCtrl.checked).toBeTruthy();
      scienceCtrl.click();
      fictionCtrl.click();
      journalsCtrl.click();

      fixture.detectChanges();
      expect(scienceCtrl.checked).toBeFalsy();
      expect(fictionCtrl.checked).toBeFalsy();
      expect(journalsCtrl.checked).toBeFalsy();
      fixture.nativeElement.querySelector('#regBtn').click();
      tick();
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/home');
    });
  }));

  it('should submit form: registerform isEdit true', fakeAsync(() => {
    spyOn(component, 'regMembership').and.callThrough();
    spyOn(service, 'clearFormValue');
    spyOn(service, 'updateMember').and.callThrough();
    fixture.whenStable().then(() => {
      const scienceCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#science');
      const fictionCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#fiction');
      const journalsCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#journals');
      expect(component.isEdit).toBeTruthy();
      component.isEdit = false;
      fixture.detectChanges();
      expect(component.isEdit).toBeFalsy();
      expect(scienceCtrl).toBeTruthy();
      expect(fictionCtrl).toBeTruthy();
      expect(journalsCtrl).toBeTruthy();

      expect(scienceCtrl.checked).toBeTruthy();
      expect(fictionCtrl.checked).toBeTruthy();
      expect(journalsCtrl.checked).toBeTruthy();
      fixture.nativeElement.querySelector('#regBtn').click();
      tick();
      tick();
      fixture.nativeElement.querySelector('#regBtn').click();
      tick();
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/home');
    });
  }));
  it('should submit form: registerform isEdit true2', fakeAsync(() => {
    spyOn(component, 'regMembership').and.callThrough();
    spyOn(service, 'clearFormValue');
    spyOn(service, 'updateMember').and.callThrough();
    fixture.whenStable().then(() => {
      const scienceCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#science');
      const fictionCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#fiction');
      const journalsCtrl: HTMLInputElement = fixture.nativeElement.querySelector('#journals');

      expect(component.isEdit).toBeTruthy();
      component.isEdit = false;
      fixture.detectChanges();
      expect(component.isEdit).toBeFalsy();

      expect(scienceCtrl).toBeTruthy();
      expect(fictionCtrl).toBeTruthy();
      expect(journalsCtrl).toBeTruthy();
      expect(scienceCtrl.checked).toBeTruthy();
      expect(fictionCtrl.checked).toBeTruthy();
      expect(journalsCtrl.checked).toBeTruthy();
      scienceCtrl.click();
      fictionCtrl.click();
      journalsCtrl.click();

      fixture.detectChanges();
      expect(scienceCtrl.checked).toBeFalsy();
      expect(fictionCtrl.checked).toBeFalsy();
      expect(journalsCtrl.checked).toBeFalsy();
      fixture.nativeElement.querySelector('#regBtn').click();
      tick();
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/home');
    });
  }));


  it('should execute cancel method', fakeAsync(() => {
    spyOn(component, 'cancel').and.callThrough();
    spyOn(service, 'clearFormValue');
    fixture.whenStable().then(() => {
      fixture.nativeElement.querySelector('#cancelBtn').click();
      tick();
      tick();
      fixture.detectChanges();
      expect(location.path()).toBe('/home');
    });
  }));




});
