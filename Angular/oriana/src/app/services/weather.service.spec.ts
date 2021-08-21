import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { IWeatherRawData } from '../models/IWeatherRawData.interface';


describe('WeatherService', () => {
  // let injector: TestBed;
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [WeatherService]
    });

    service = TestBed.get(WeatherService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  afterAll (() => {
    httpMock.verify();
  });

  it('should fetch cities based on searched query', () => {
    const mockSearchLocationData = [
      {'title': 'San Francisco', 'location_type': 'City', 'woeid': 2487956, 'latt_long': '37.777119, -122.41964'},
      {'title': 'San Diego', 'location_type': 'City', 'woeid': 2487889, 'latt_long': '32.715691,-117.161720'},
      {'title': 'San Jose', 'location_type': 'City', 'woeid': 2488042, 'latt_long': '37.338581,-121.885567'},
    ];
    const searchedString = 'san';

    service.searchLocation(searchedString)
           .subscribe(
              data => {
                expect(data).toEqual(mockSearchLocationData);
                expect(data.length).toBe(3);
              },
              fail
            );

    const req = httpMock.expectOne(`${service.baseUrl}/api/location/search/?query=${searchedString}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSearchLocationData);
  });

  it('should fetch the city details based on the cityId', () => {
    const searchedCityId = 2347563;
    const mockCityDetails: IWeatherRawData = {
      consolidated_weather: [
          {
              weather_state_name: 'state',
              weather_state_abbr: 'cloudy',
              applicable_date: '2018-08-03',
              the_temp: 29,
          }
      ],
      parent: {
          title: 'country',
      },
      title: 'title',
    };
    const transformedCityDetails = service.transformRawData(mockCityDetails);
    console.log(transformedCityDetails)
    service.getCityDetails(searchedCityId)
           .subscribe(
             
              data => { console.log(data);expect(data).toEqual(transformedCityDetails); },
              fail
            );

    const req = httpMock.expectOne(`${service.baseUrl}/api/location/${searchedCityId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCityDetails);
  });
});
