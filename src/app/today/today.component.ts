import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { IWeatherResponse } from '../interfaces/IWeatherResponse';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public weather: IWeatherResponse;

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
      tap((res) => console.log(res)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

}
