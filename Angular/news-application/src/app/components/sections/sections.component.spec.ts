import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { news } from '../../store/reducers/news.reducer';
import { sections } from '../../store/reducers/sections.reducer';

import { SectionsComponent } from './sections.component';
import { By } from '@angular/platform-browser';

describe('SectionsComponent', () => {
  let component: SectionsComponent;
  let fixture: ComponentFixture<SectionsComponent>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({ sections, news }),
        RouterTestingModule
      ],
      declarations: [ SectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should store the sections in array: sectionList ', async() => {
    const sections = [
      'home', 'opinion', 'world', 'national', 'politics', 'business', 'technology',
      'science', 'health', 'sports', 'arts', 'books', 'movies', 'theater', 'fashion',
      'food', 'travel', 'magazine', 'realestate', 'automobiles'
    ];
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.sectionList).toBeDefined;
  });

  it ('should display the section name in DOM', () => {
    component.sectionList = [
      'home', 'opinion', 'world', 'national', 'politics', 'business', 'technology',
      'science', 'health', 'sports', 'arts', 'books', 'movies', 'theater', 'fashion',
      'food', 'travel', 'magazine', 'realestate', 'automobiles'
    ];
    let el: HTMLElement = fixture.debugElement.query(By.css('a')).nativeElement;

    fixture.detectChanges();
    expect(el.innerText).toContain('home');
  });
});
