import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import '../../../../node_modules/zone.js/dist/zone.js';
import { By } from '@angular/platform-browser';
import { click } from '../../../../testing/index';

import { NavbarComponent } from './navbar.component';
import { NewsActions } from '../../store/actions/news.actions';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.provideStore({})],
      declarations: [ NavbarComponent ],
      providers: [ NewsActions ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should define the store', () => {
    store = TestBed.get(Store);

    expect(store).toBeDefined;
  });
  it('should define subsections', async() => {
    fixture.detectChanges();
    expect(component.subsections).toBeDefined();
  });
  it('should display subsection in template', async() => {
    // assign mock values to subsections array
    component.subsections = ['movie', 'tech', 'money'];
    // <a> tag in html will contain one of values of subsections array. select the <a> tag using query(By.css())
    const anchorElement = fixture.debugElement.query(By.css('a')).nativeElement.textContent;
    // after assigning values to subsections, detect changes. this is async call.
    fixture.detectChanges();

    expect(component.subsections).toContain(anchorElement);
  });

  it('should call dispatchAction() when subsection is clicked', async() => {
    // you need to spy on the dispatchAction method
    spyOn(component, 'dispatchAction');

    const anchorElement = fixture.debugElement.query(By.css('a'));
    click(anchorElement);

    // click contains asynchronous event handling. so you need to wait, for the event to process, by calling fixture.whenStable
    fixture.whenStable().then(() => {
      expect(component.dispatchAction).toHaveBeenCalled();
    });
  });

  it('should dispatch action when dispatchAction is called', async() => {
    // you need to spy on store's 'dispatch' method
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    // if you call function dispatchAction with 'movies' paramter. expect store to dispatch action='movies'
    component.dispatchAction('movies');
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith('movies');
  });
});
