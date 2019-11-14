import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WeatherService} from './shared/services/weather.service';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { HeaderComponent } from './layout/header/header.component';
import { WeatherForecastComponent } from './pages/weather-forecast/weather-forecast.component';
import { WeatherTodayComponent } from './pages/weather-today/weather-today.component';
import {TempreaturePipe} from './shared/pipe/tempreature.pipe';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherForecastComponent,
    WeatherTodayComponent,
    TempreaturePipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
