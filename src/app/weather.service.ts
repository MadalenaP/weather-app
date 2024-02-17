import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { IWeatherForecast } from './interfaces/IWeatherForecast';
import { ISingleDayWeatherResponse } from './interfaces/ISingleDayWeatherResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string = '52589cc9b87acc4e462d8fb967fec892';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';
  public userLocation: GeolocationPosition;

  constructor(
    private http: HttpClient,
    private router: Router) { }


  public getTodaysWeather(): Observable<ISingleDayWeatherResponse> {
    if (this.userLocation) {
      return this.getCurrentWeather();
    } else {
      return this.getPosition().pipe(
        tap((location) => this.userLocation = location),
        switchMap(() => this.getCurrentWeather())
      );
    }
  }


  public getWeatherForecast(): Observable<IWeatherForecast> {
    if (this.userLocation) {
      return this.get5DaysWeather();
    } else {
      return this.getPosition().pipe(
        tap((location) => this.userLocation = location),
        switchMap(() => this.get5DaysWeather())
      );
    }
  }

  private getCurrentWeather(): Observable<ISingleDayWeatherResponse> {
    return this.http.get<ISingleDayWeatherResponse>(`${this.baseUrl}/weather?lat=${this.userLocation.coords.latitude}&lon=${this.userLocation.coords.longitude}&appid=${this.apiKey}&units=metric`);
  }

  private get5DaysWeather(): Observable<IWeatherForecast> {
    return this.http.get<IWeatherForecast>(`${this.baseUrl}/forecast?lat=${this.userLocation.coords.latitude}&lon=${this.userLocation.coords.longitude}&appid=${this.apiKey}&units=metric`);
  }


  private getPosition(): Observable<GeolocationPosition> {
    return new Observable(observer => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      },
        error => {
          observer.error(error)
          this.router.navigate(['/error']);
        }
        );
    });
}
}
