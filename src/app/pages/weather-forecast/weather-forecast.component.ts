import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../../shared/services/weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  @Input() selectedCountryID;
  @Input() isFaheranhite;
  public forecastData: Array<any> = [];
  p: number = 1;
  itemsPerPage: number = 10;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherForcast();
  }

  /**
   * Weather forecast get hourly data**/
  weatherForcast() {
    this.weatherService.getWeatherForecastByID(this.selectedCountryID).subscribe(data => {
      if (this.forecastData.length === 0) {
        data['list'].forEach(item => {
          this.forecastData.push({
            time: item.dt_txt,
            cloud: item.clouds.all,
            temp: item.main.temp,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed
          });
        });
      } else {
        this.forecastData = [];
        data['list'].forEach(item => {
          this.forecastData.push({
            time: item.dt_txt,
            cloud: item.clouds.all,
            temp: item.main.temp,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed
          });
        });
      }
    });
  }

}
