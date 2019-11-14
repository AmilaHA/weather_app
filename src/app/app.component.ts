import {AfterContentInit, Component, OnInit} from '@angular/core';
import {WeatherService} from './shared/services/weather.service';
import * as Papa from 'papaparse/papaparse.min.js';
import {URL_CONST} from './shared/config/url_const';

enum TempreatureType {
  FRANHITE = 'F',
  CELCIOUS = 'C'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {

  title = 'weatherApp';
  public countryListData = [];
  public filteredCountryList = [];
  public countryList = [];
  public selectedCountryID: any = 1248991;
  public city;
  public temprature;
  public minTemp;
  public maxTemp;
  public humidity;
  public imageIcon;
  public keyword = 'name';
  public tempreatureType = TempreatureType.FRANHITE;
  public isFaheranhite = true;
  public ishideDropDown = true;
  public searchValue: any;
  tempreatureFormat = TempreatureType;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    // this.callConveertFile();
  }

  ngAfterContentInit(): void {
    this.callConveertFile();
  }
  async callConveertFile() {
    this.countryList = await this.convertFile();
    this.removeUndefine();
    this.getCurrent();
  }

  /**
   * convert countries csv to json used Papa js library**/
   convertFile(): Promise<any> {
     return new Promise<any>(resolve => {
        Papa.parse(URL_CONST.COUNTRIES, {
          dynamicTyping: true,
          download: true,
          header: true,
          complete: function(results) {
            this.countryList = results.data;
            resolve(this.countryList);
          }
        });
     });
  }

  /**
   * filter value for dropdown list**/
  filterValue(value) {
     if (value.length > 3) {
       this.ishideDropDown = false;
       const matches = [];
       let i;
       for (i = 0; i < this.countryListData.length; i++) {
         if (this.countryListData[i].name.toLowerCase().match(value)) {
           matches.push(this.countryListData[i]);
         }
       }
       this.filteredCountryList = matches;
       return matches;
     }
  }

  /**
   * Select value for country Id**/
  setSelectedValue(id, name) {
    this.selectedCountryID = id;
    this.searchValue = name;
    this.ishideDropDown = true;
  }

  /**
   * current weather forecast**/
  getCurrent() {
    this.weatherService.getCurrentWeatherByID(this.selectedCountryID).subscribe(data => {
      this.city = data['name'];
      this.temprature = data['main']['temp'];
      this.maxTemp = data['main']['temp_max'];
      this.minTemp = data['main']['temp_min'];
      this.minTemp = data['main']['temp_min'];
      this.humidity = data['main']['humidity'];
      this.imageIcon = URL_CONST.IMAGE_PATH + data['weather'][0].icon + '@2x.png';
    });
  }

  /**
   * some names are undefined in countries removed undefined countries**/
  removeUndefine() {
    this.countryList.forEach(country => {
      if (country.name !== null && country.name !== undefined) {
        this.countryListData.push(country);
      }
    });
  }

  /**
   * Select Teampreature format**/
  selectedTempreatureFormat(value) {
    if (value !== this.tempreatureType) {
      if (value === this.tempreatureFormat.FRANHITE) {
        this.tempreatureType = this.tempreatureFormat.FRANHITE;
        this.isFaheranhite = true;
      } else {
        this.tempreatureType = this.tempreatureFormat.CELCIOUS;
        this.isFaheranhite = false;
      }
    }
  }
}
