import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contact.service';
import { Contacts } from '../models/contacts';

describe('ContactService', () => {
  let httpTestingController: HttpTestingController;
  let service: ContactService;
  let expectedContacts: Contacts;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    })
    .compileComponents();

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ContactService);
  });

  beforeEach(() => {
    expectedContacts = {
      contactsList: [
        {
          id: 1,
          name: 'Rajesh',
          city: 'Delhi',
        },
        {
          id: 2,
          name: 'Sandy',
          city: 'California',
        }
      ]
    };
  });

  afterEach(() => {
    // after every test, ensure there are no more pending requests
    httpTestingController.verify();
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('should return expected contacts', () => {
    service.getContacts()
            .subscribe(
              data => expect(data).toEqual(expectedContacts, 'should return expectedContacts'),
              err => fail('should send expectedContacts')
            );

    // contactService should have made one GET request to url='http://www.mocky.io/v2/5c5d880f3200000e11220880'
    const req = httpTestingController.expectOne(service.url);
    expect(req.request.method).toEqual('GET');

    // respond with dummy contacts data (mock data)
    req.flush(expectedContacts);
  });

  it('should be OK returning empty contacts', () => {
    service.getContacts()
            .subscribe(
              data => expect(data.contactsList.length).toEqual(0, 'should have empty contacts'),
              err => fail('should have empty contacts')
            );

    const req = httpTestingController.expectOne(service.url);
    req.flush({contactsList: []}); // respond to the "url" with empty contacts
  });

  it('should turn 404 into user friendly error', () => {
    service.getContacts()
            .subscribe(
              data => fail('expected to fail with 404 message'),
              err => expect(err.message).toContain('404')
            );

    const req = httpTestingController.expectOne(service.url);
    req.flush('404', { status: 404, statusText: 'Not Found' });
  });
});
