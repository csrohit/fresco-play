import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
//import { Router, provideRoutes, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
//import { ContactsComponent } from './components/contacts/contacts.component';
//import { CityComponent } from './components/city/city.component';
import { ContactService } from './services/contact.service';

/**
 * Using 'RouterTestingModule'
 * gives error:  NullInjectorError: No provider for AppComponent!
 */
// describe('AppComponent', () => {
//   let router: Router;
//   let location: Location;
//   let fixture: ComponentFixture<AppComponent>;
//   let component: AppComponent;
//   let contactServiceSpy;

//   beforeEach(async(() => {
//     contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContacts']);
//     TestBed.configureTestingModule({
//       imports: [ RouterTestingModule],
//       declarations: [
//         AppComponent,
//         ContactsComponent,
//         CityComponent
//       ],
//       providers: [{ provide: ContactService, useValue: contactServiceSpy }]
//     }).compileComponents();

//     router = TestBed.get(Router);
//     location = TestBed.get(Location);
//     fixture = TestBed.get(AppComponent);
//     component = fixture.componentInstance;
//     router.initialNavigation();
//     fixture.detectChanges();
//   }));

//   it('should create the app', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { AppModule } from './app.module';
import { Observable, of } from 'rxjs';
//import { RouterLinkDirectiveStub } from '../testing';
//import { DebugElement } from '@angular/core';
//import { By } from '@angular/platform-browser';

/*describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDebugElements: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })

    // Get rid of app's Router configuration otherwise many failures.
    // Doing so removes Router declarations; add the Router stubs
    .overrideModule(AppModule, {
      remove: {
        imports: [RouterModule]
      },
      add: {
        declarations: [ RouterLinkDirectiveStub ]
      }
    })

    .compileComponents()

    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });

  }));

  beforeEach(() => {
    fixture.detectChanges(); // trigger initial changes

    // get all DebugElements with routerLink
    linkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = linkDebugElements.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  // it('should initialize the component', () => {
  //   expect(component).not.toBeNull();
  // });

  it('should have routerlinks in template', () => {
    expect(routerLinks.length).toBe(2, 'should have 2 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/contacts');
    expect(routerLinks[1].linkParams).toBe('/cities');
  });

  it('should navigate to /contacts when clicked on Contacts link', () => {
    const contactsLinkDe = linkDebugElements[0]; // contacts link debug element
    const contactsLink = routerLinks[0];

    expect(contactsLink.navigatedTo).toBeNull('should not have navigated yet');

    contactsLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(contactsLink.navigatedTo).toBe('/contacts');
  });

  it('should navigate to /cities when clicked on Cities link', (() => {
    const citieslinkDe = linkDebugElements[1];
    const citiesLink = routerLinks[1];

    citieslinkDe.triggerEventHandler('click', null);
    fixture.detectChanges(); // update app to detect changes

    expect(citiesLink.navigatedTo).toEqual('/cities', 'should have navigated to /cities');
  }));

});*/

class MockService {
  getContacts():Observable<any> {
    return of({});
  }
}
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  
  let location: Location;
  let service: ContactService;
  
  let contactLink:HTMLElement;
  let citiesLink:HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, RouterTestingModule.withRoutes(routes) ],
      declarations: [],
      providers:[{
        provide:ContactService, useClass:MockService
      }]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      
      location = TestBed.get(Location);
      service = TestBed.get(ContactService);
    });

  }));

  beforeEach(() => {
    fixture.detectChanges(); // trigger initial changes
    
    contactLink = fixture.nativeElement.querySelector('#contact-link');
    citiesLink = fixture.nativeElement.querySelector('#cities-link');
  });

  it('should have routerlinks in template', () => {
    expect(contactLink).toBeTruthy();
    expect(citiesLink).toBeTruthy();
  });

  it('should navigate to /contacts when clicked on Contacts link', fakeAsync(() => {
    contactLink.click();
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/contacts');
  }));

  it('should navigate to /cities when clicked on Cities link', fakeAsync(() => {
    citiesLink.click();
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/cities');
  }));

});

