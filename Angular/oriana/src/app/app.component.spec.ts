import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { noop } from 'rxjs/internal-compatibility';
import { of } from 'rxjs/internal/observable/of';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { CityComponent } from './components/city/city.component';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { WeatherService } from './services/weather.service';

class WeatherServiceStub {
  searchLocation() { return of(noop()); }
  getCityDetails() { return of(noop()); }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let service: WeatherService;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchComponent,
        CityComponent
      ],
      imports: [
        MaterialModule,
        HttpClientModule,
        NoopAnimationsModule
      ],
      providers: [
        WeatherService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    service = fixture.debugElement.injector.get(WeatherService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should render title in a text-mid class', async(() => {
    const titleEl = fixture.debugElement.query(By.css('.text-mid')).nativeElement;
    expect(titleEl.textContent).toContain('My Weather App');
  }));
  it('should call weatherService.getCityDetails when getCityDetails() is called', () => {
   const mockCityid = 615702;
   spyOn(service, 'getCityDetails').and.callThrough();

   component.getCityDetails(mockCityid);
   expect(service.getCityDetails).toHaveBeenCalledWith(mockCityid);
  });
});
