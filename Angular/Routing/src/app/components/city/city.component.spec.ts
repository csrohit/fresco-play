import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CityComponent } from './city.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactService } from 'src/app/services/contact.service';
import { Contacts } from 'src/app/models/contacts';
import { of } from 'rxjs';

describe('CityComponent', () => {
  let fixture: ComponentFixture<CityComponent>;
  let component: CityComponent;
  let service;
  let getContactsSpy: jasmine.Spy;
  let testContacts: Contacts;

  beforeEach(async(() => {
    service = jasmine.createSpyObj('ContactService', ['getContacts']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CityComponent],
      providers: [{provide: ContactService, useValue: service}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testContacts = {
      contactsList: [
        {id: 1, name: 'some name', city: 'delhi'},
        {id: 1, name: 'some name2', city: 'mumbai'},
      ]
    };

    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    getContactsSpy = service.getContacts.and.returnValue(of(testContacts));
  });

  // it('should create the component', () => {
  //   expect(component).toBeDefined();
  // });

  // it('should not get data before ngOnInit()', fakeAsync(() => {
  //   /**
  //    * getContacts() service function should NOT have got any calls
  //    * as component is not yet initialized
  //    * i.e. ngOnInit() is not yet called
  //    */
  //   expect(getContactsSpy.calls.any()).toBe(false, 'service should not be called yet');
  // }));

  it('should get data from server, after component is initialized', fakeAsync(() => {
    fixture.detectChanges(); // ngOnInit()

    tick(); // wait for async calls, and flush observables with data
    fixture.detectChanges(); // update after getting data from observables

    expect(component.contacts).toEqual(testContacts.contactsList, 'should get expected data from server');
  }));

  it('should call getContacts() atleast once', fakeAsync(() => {
    fixture.detectChanges(); // ngOnInit()
    expect(getContactsSpy.calls.count()).toBe(1, 'should have called getContacts when component is initialized');
  }));

  it('should display all cities in the template using <p> element', fakeAsync(() => {
    fixture.detectChanges(); // ngOnInit()
    tick(); // wait for async calls, and flush observables with data
    fixture.detectChanges(); // update view after getting observable data

    // find all contacts in DOM using css class
    const paragraphEl = fixture.nativeElement.querySelectorAll('p');
    expect(paragraphEl.length).toBe(2, 'should display 2 cities in template');
  }));
});
