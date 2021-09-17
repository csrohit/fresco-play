import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';

import { NewsService } from './news.service';

const mockResponse = {
  'status': 'OK',
  'copyright': 'Copyright (c) 2018 The New York Times Company. All Rights Reserved.',
  'section': 'home',
  'last_updated': '2018-03-31T07:27:13-04:00',
  'num_results': 38,
  'results': [
    {
      'section': 'World',
      'subsection': 'Europe',
      'title': 'Trump Advisers Urge Tougher Russia Policy After Expulsions',
      'abstract': 'xx',
      'url': 'https://www.nytimes.com/2018/03/30/world/europe/russia-expels-diplomacy.html',
      'byline': 'By PETER BAKER, ANDREW HIGGINS and STEVEN ERLANGER',
      'item_type': 'Article',
      'updated_date': '2018-03-31T06:22:15-04:00',
      'created_date': '2018-03-30T14:17:19-04:00',
      'published_date': '2018-03-30T14:17:19-04:00',
      'material_type_facet': '',
      'kicker': '',
      'des_facet': [
        'Diplomatic Service, Embassies and Consulates',
        'Espionage and Intelligence Services'
      ],
      'org_facet': [
        'State Department',
        'Boeing Company'
      ],
      'per_facet': [
        'Putin, Vladimir V',
        'Skripal, Sergei V'
      ],
      'geo_facet': [
        'Moscow (Russia)',
        'St Petersburg (Russia)',
        'Seattle (Wash)'
      ],
      'multimedia': [
        {
          'url': 'https://static01.nyt.com/images/2018/03/31/world/europe/31dc-russia1-print-sub/31diplo-russia1-thumbStandard.jpg',
          'format': 'Standard Thumbnail',
          'height': 75,
          'width': 75,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Alexander Nemenov/Agence France-Presse &mdash; Getty Images'
        },
        {
          'url': 'https://static01.nyt.com/images/2018/03/31/world/europe/31dc-russia1-print-sub/31diplo-russia1-thumbLarge.jpg',
          'format': 'thumbLarge',
          'height': 150,
          'width': 150,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Alexander Nemenov/Agence France-Presse &mdash; Getty Images'
        },
        {
          'url': 'xx',
          'format': 'Normal',
          'height': 127,
          'width': 190,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Alexander Nemenov/Agence France-Presse &mdash; Getty Images'
        },
        {
          'url': 'xx',
          'format': 'mediumThreeByTwo210',
          'height': 140,
          'width': 210,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Alexander Nemenov/Agence France-Presse &mdash; Getty Images'
        },
        {
          'url': 'xx',
          'format': 'superJumbo',
          'height': 1365,
          'width': 2048,
          'type': 'image',
          'subtype': 'photo',
          'caption': 'xx',
          'copyright': 'Alexander Nemenov/Agence France-Presse &mdash; Getty Images'
        }
      ],
      'short_url': 'https://nyti.ms/2uzn7ds'
    }
  ]
};

describe('NewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        NewsService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should be created', inject([NewsService], (service: NewsService) => {
    expect(service).toBeTruthy();
  }));

  it('should get results', fakeAsync(
    inject(
      [XHRBackend, NewsService ],
      (mockBackend: MockBackend, newsService: NewsService) => {

      const expectedUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=315a5a51483b469a918246dc2753b339';

      mockBackend.connections.subscribe((connection : MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: mockResponse })
          ));
        });

      newsService.getSectionNews('home')
        .subscribe( (res: any) => {
            expect(res).toEqual(mockResponse);
        });
    })
  ));
});
