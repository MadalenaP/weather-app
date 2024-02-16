import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, tap, takeUntil, last } from 'rxjs';
import { WeatherService } from '../weather.service';
import { IWeatherForecast } from '../interfaces/IWeatherForecast';
import { DateTime } from 'luxon';
import { IWeatherResponse } from '../interfaces/IWeatherResponse';

@Component({
  selector: 'app-next-days',
  templateUrl: './next-days.component.html',
  styleUrls: ['./next-days.component.scss']
})
export class NextDaysComponent implements OnInit, OnDestroy {  
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public forecast: IWeatherForecast;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.getWeatherForecast();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  private getWeatherForecast(): void {
    if (!this.forecastInLocalStorage()) {
      this.weatherService.getWeatherForecast().pipe(
        tap((forecast) => {
          this.forecast = this.filterForecastData(forecast);
          localStorage.setItem('lastUpdate', (new Date()).toISOString());
          localStorage.setItem('forecast', JSON.stringify(this.forecast));
        }),
        tap((res) => console.log(res)),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }

  private forecastInLocalStorage(): boolean {
    const lastUpdate = localStorage.getItem('lastUpdate');
    if (lastUpdate && DateTime.now().diff(DateTime.fromISO(lastUpdate), 'days').days  < 1) {
      this.forecast = JSON.parse(localStorage.getItem('forecast') || '') as IWeatherForecast;
      return true;
    } 
    return false;
  }

  private filterForecastData(forecast: IWeatherForecast): IWeatherForecast {
    const newForecastDays: IWeatherResponse[] = forecast.list.filter(s => s.dt_txt && (new Date(s.dt_txt).getHours() === 0));
    forecast.list = newForecastDays.slice(0, 4);
    return forecast;
  }
}
