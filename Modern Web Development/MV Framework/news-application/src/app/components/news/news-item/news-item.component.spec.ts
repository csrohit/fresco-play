import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemComponent } from './news-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    component.id = 0;
    component.newsItem = {
      'section': 'U.S.',
      'subsection': 'Politics',
      'title': 'Let Us Catch You Up on the Biggest Stories in Politics This Week',
      'abstract': 'xx',
      'url': 'https://www.nytimes.com/2018/03/30/us/politics/let-us-catch-you-up-on-the-biggest-stories-in-politics-this-week.html',
      'byline': 'By EMILY COCHRANE',
      'item_type': 'Article',
      'updated_date': '2018-03-30T15:37:50-04:00',
      'created_date': '2018-03-30T13:15:15-04:00',
      'published_date': '2018-03-30T13:15:15-04:00',
      'material_type_facet': '',
      'kicker': '',
      'des_facet': [
        'United States International Relations'
      ],
      'org_facet': [],
      'per_facet': [
        'Trump, Donald J',
        'Hicks, Hope C (1988- )',
        'Shulkin, David J'
      ],
      'geo_facet': [],
      'multimedia': [
        {
          'url': 'https://static01.nyt.com/images/2018/03/31/us/politics/31dc-roundup/31dc-roundup-thumbStandard.jpg',
          'format': 'Standard Thumbnail',
          'height': 75,
          'width': 75,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Doug Mills/The New York Times'
        },
        {
          'url': 'https://static01.nyt.com/images/2018/03/31/us/politics/31dc-roundup/31dc-roundup-thumbLarge.jpg',
          'format': 'thumbLarge',
          'height': 150,
          'width': 150,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Doug Mills/The New York Times'
        },
        {
          'url': 'xx',
          'format': 'Normal',
          'height': 127,
          'width': 190,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Doug Mills/The New York Times'
        },
        {
          'url': 'https://static01.nyt.com/images/2018/03/31/us/politics/31dc-roundup/31dc-roundup-mediumThreeByTwo210.jpg',
          'format': 'mediumThreeByTwo210',
          'height': 140,
          'width': 210,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Doug Mills/The New York Times'
        },
        {
          'url': 'xx',
          'format': 'superJumbo',
          'height': 1365,
          'width': 2048,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Doug Mills/The New York Times'
        }
      ],
      'short_url': 'https://nyti.ms/2uxKP9U'
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display title in template', () => {
    let titleElement: HTMLElement = fixture.debugElement.query(By.css('h5')).nativeElement;

    expect(titleElement.innerText).toContain('Let Us Catch You Up on the Biggest Stories in Politics This Week');
  });

  it('should display news abstract in template', () => {
    let abstractElement: HTMLElement = fixture.debugElement.query(By.css('.media-body')).nativeElement;

    expect(abstractElement.innerText).toContain('xx');
  });
});
