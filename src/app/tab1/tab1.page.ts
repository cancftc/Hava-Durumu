import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from '../api/weather-api.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  fetch5DaysData:any = null;
  constructor(private weather:WeatherAPIService) {}
  ngOnInit(): void {
    this.getCurrentPossition().then((coordinates)=>{
      //  console.log(coordinates);
        this.get5DaysWeather(coordinates.coords.latitude,coordinates.coords.longitude);
        //this.watchPosition();
      });
  }

  async getCurrentPossition(){
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  }

  

  get5DaysWeather(lat:any,lon:any){
    this.weather.get5DaysWeather(lat,lon).subscribe(
      (data) => {
        console.log(data);
        
        this.fetch5DaysData = data;
      }
    );
  }
}
