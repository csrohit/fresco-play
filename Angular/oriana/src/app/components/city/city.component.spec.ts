import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CityComponent } from './city.component';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientModule,
        NoopAnimationsModule
      ],
      declarations: [ CityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    component.cityDetails = {
      city: 'chennai',
      country: 'india',
      weather: [
        {
          date: '2018-08-03',
          temperature: 31.105,
          weather_name: 'sunny',
          weather_image: 'some image url',
        }
      ]
    };
    fixture.detectChanges();
  });
  it('should display city and country', () => {
    const cityEl = fixture.debugElement.query(By.css('.cityName')).nativeElement;
    expect(cityEl.textContent).toContain('chennai, india');
  });
  it('should display formatted date', () => {
    const dateEl = fixture.debugElement.query(By.css('.date')).nativeElement;
    expect(dateEl.textContent).toContain('Aug 3, 2018');
  });
  it('should display temperature with only 1 decimal', () => {
    const tempEl = fixture.debugElement.query(By.css('.cityTemp')).nativeElement;
    expect(tempEl.textContent).toContain('31.1');
  });
  it('should display temperature with minimum 2 digits left to decimal', () => {
    const tempEl = fixture.debugElement.query(By.css('.cityTemp')).nativeElement;
    component.cityDetails.weather[0].temperature = 2;
    fixture.detectChanges();

    expect(tempEl.textContent).toContain('02.0');
  });
  it('should display weather name', () => {
    const weatherEl = fixture.debugElement.query(By.css('.weather')).nativeElement;
    expect(weatherEl.textContent).toContain(component.cityDetails.weather[0].weather_name);
  });
  // it('should set image url', () => {
  //   const imageDe = fixture.debugElement.query(By.css('.weatherIcon')).attributes;
  //   expect(component.find('weatherIcon').prop('src')).toEqual(component.cityDetails.weather[0].weather_image);
  // });
});

