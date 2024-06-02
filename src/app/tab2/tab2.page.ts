import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from '../api/weather-api.service';
import { Observable } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  fetchData:any;
  city:string = "";
  country:string = "";
  deg:string = "";
  statu:string = "";
  wind:string ="";
  windDeg:string = "";
  currentIcon:string = "";
  hum: string = "";
  fetch5DaysData:any = null;

  constructor(private weather:WeatherAPIService) {}

  ngOnInit(): void {
    this.getCurrentPossition().then((coordinates)=>{
    //  console.log(coordinates);
      this.getCurrentWeather(coordinates.coords.latitude,coordinates.coords.longitude);
      this.get5DaysWeather(coordinates.coords.latitude,coordinates.coords.longitude);
      //this.watchPosition();
    });
  }

  async getCurrentPossition(){
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  }

  async watchPosition(){
    await Geolocation.watchPosition({enableHighAccuracy: true, timeout: 1000}, (position, err) => {
      try{
        if(position){
          this.getCurrentWeather(position?.coords.latitude,position?.coords.longitude);
          this.get5DaysWeather(position?.coords.latitude,position?.coords.longitude);
        }
      }catch(e){
      }
    });
  }

  getCurrentWeather(lat:any, lon:any){
    this.weather.getCurrentWeather(lat, lon).subscribe(
      (data) => {
        console.log(data);
        this.fetchData = data;
        this.city = this.fetchData.name;
        this.country = this.fetchData.sys.country;
        this.statu = this.fetchData.weather[0].description;
        this.deg = this.fetchData.main.temp;
        this.wind = this.fetchData.wind.speed;
        this.hum = this.fetchData.main.humidity;
       this.currentIcon = "https://openweathermap.org/img/wn/"+this.fetchData.weather[0].icon+"@4x.png";
      }
    );
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
