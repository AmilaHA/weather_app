import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.css']
})
export class WeatherTodayComponent implements OnInit {

  @Input() city;
  @Input() temprature;
  @Input() minTemp;
  @Input() maxTemp;
  @Input() humidity;
  @Input() imageIcon;
  @Input() isFaheranhite;
  constructor() { }

  ngOnInit() {
  }

}
