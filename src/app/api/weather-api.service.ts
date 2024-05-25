import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {
  apiKey:string = "51a7c721156539841d84e0a68c86f284";
  apiUrl:string = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&appid="+this.apiKey;
  
  constructor(private http:HttpClient) { }

  getCurrentWeather(lat:string,lon:string): Observable<any>{
   return this.http.get(this.apiUrl+"&lat="+lat+"&lon="+lon);
  }

  get5DaysWeather(lat:string,lon:string): Observable<any>{
    let uri = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=tr&appid="+this.apiKey+"&lat="+lat+"&lon="+lon;
    return this.http.get(uri);
  }
}
