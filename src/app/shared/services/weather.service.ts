import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_CONST} from '../config/url_const';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeatherByID(cityID) {
    return this.http.get(URL_CONST.URL_PREFIX + '/weather?id=' + cityID + '&APPID=' + URL_CONST.API_KEY);
  }

  getWeatherForecastByID(cityID) {
    return this.http.get(URL_CONST.URL_PREFIX + '/forecast?id=' + cityID + '&APPID=' + URL_CONST.API_KEY);
  }
}
