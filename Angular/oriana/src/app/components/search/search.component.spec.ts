import { ISearchResult } from './../../models/IWeatherData.interface';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { noop } from 'rxjs/internal-compatibility';
import { of } from 'rxjs/internal/observable/of';

import { SearchComponent } from './search.component';
import { WeatherService } from './../../services/weather.service';

class WeatherServiceStub {
  searchLocation()   { return of(noop()); }
  getCityDetails()   { return of(noop()); }
  transformRawData() { return of(noop()); }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let service: WeatherService;

  describe('search()', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          HttpClientModule,
          NoopAnimationsModule
        ],
        declarations: [ SearchComponent ],
        providers: [
            {provide: WeatherService, useClass: WeatherServiceStub}
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WeatherService);
      fixture.detectChanges();
    });

    it ('should call weatherService.searchLocation when some character is typed', () => {
      const mockSeaarchedTerm = 'paris';
      const mockSearchedResult = [
          {'title': 'Paris', 'location_type': 'City', 'woeid': 615702, 'latt_long': '48.856930,2.341200'}
        ];
      spyOn(service, 'searchLocation').and.callFake(() => {
        return of(mockSearchedResult);
      });

      component.search(mockSeaarchedTerm);
      expect(service.searchLocation).toHaveBeenCalledWith(mockSeaarchedTerm);
    });
    it('should not call weatherService.searchLocation when searchedString is empty', () => {
      const mockSeaarchedTerm = '';
      spyOn(service, 'searchLocation').and.callThrough();

      component.search(mockSeaarchedTerm);
      expect(component.searchResults).toEqual(null);
      expect(service.searchLocation).not.toHaveBeenCalledWith(mockSeaarchedTerm);
    });
  });

  describe('selectedLocation()', () => {
    let mockCityDetails: ISearchResult;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          HttpClientModule,
          NoopAnimationsModule
        ],
        declarations: [ SearchComponent ],
        providers: [
            {provide: WeatherService, useClass: WeatherServiceStub}
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WeatherService);

      mockCityDetails = {
        title: 'title',
        location_type: 'city',
        woeid: 1,
        latt_long: '22',
      };

      component.searchResults = [
        {
        title: 'wasdas',
        location_type: 'city',
        woeid: 1,
        latt_long: '22',
        }
      ];

      fixture.autoDetectChanges();
    });
    it ('should emit cityid', () => {
      component.selectedCity.subscribe(cityId =>
        expect(cityId).toBe(mockCityDetails.woeid)
      );

      component.selectedLocation(mockCityDetails);
    });
    it('should clear searchResults', () => {
      component.selectedLocation(mockCityDetails);
      expect(component.searchResults).toBeNull();
    });
    it('should be called when cityName is clicked', () => {
      spyOn(component, 'selectedLocation');
      const cityDe = fixture.debugElement.query(By.css('.searchItem'));

      // make the condition true so the class=searchItem is available
      // fixture.detectChanges();

      cityDe.triggerEventHandler('click', null);
      // fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.selectedLocation).toHaveBeenCalledWith(component.searchResults[0]);
      });
    });
  });
});
