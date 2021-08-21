import { Component, OnInit, Input } from '@angular/core';
import { IWeatherData } from '../../models/IWeatherData.interface';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  /*
    CHALLENGE
     - Take the city details from app.component.html into "cityDetails"
     - display the city details in the template
  */
  @Input()cityDetails: IWeatherData;
  constructor() { }

  ngOnInit() {
    console.log(this.cityDetails)
  }

}
