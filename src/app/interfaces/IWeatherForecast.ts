import { IWeatherResponse } from './IWeatherResponse'

export interface IWeatherForecast       
{
  'cod': string,
  'message': number,
  'cnt': number,
  'list': IWeatherResponse[],
  'city': {
    'id': number,
    'name': string,
    'coord': {
      'lat': number,
      'lon': number
    },
    'country': string,
    'population': number,
    'timezone': number,
    'sunrise': number,
    'sunset': number
  }
}
        
    