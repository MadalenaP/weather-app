import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ISingleDayWeatherResponse } from '../interfaces/ISingleDayWeatherResponse';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public weather: ISingleDayWeatherResponse;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.getCurrentWeather();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getCurrentWeather(): void {
    this.weatherService.getTodaysWeather().pipe(
      tap((weather) => this.weather = weather),
      takeUntil(this.destroy$)
    ).subscribe();
  }

}
