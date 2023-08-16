import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { key } from "../../../api.key";
import { Observable, Subject, catchError, map, of, switchMap } from "rxjs";
import { SearchParams } from "../types";
import { Countries } from "../components/shared/countries";

const baseUrl = "http://api.openweathermap.org";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  weatherSearchParams$: Subject<SearchParams> = new Subject();

  //lat long search, all searches end up becoming this
  searchWeatherByLatLong(lat: number, lon: number, units: string = "imperial") {
    return this.http
      .get(
        `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`
      )
      .pipe(catchError((e) => of(e)));
  }

  searchWeatherForecastLatLon(
    lat: number,
    lon: number,
    units: string = "imperial"
  ) {
    return this.http
      .get(
        `${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`
      )
      .pipe(catchError((e) => of(e)));
  }

  //city search
  searchWeatherCityName(
    cityName: string,
    countryName: string,
    units: string
  ): Observable<any> {
    return this.http
      .get(`${baseUrl}/geo/1.0/direct?q=${cityName}'&limit=5&appid=${key}`)
      .pipe(
        map((data: any) => {
          return data.filter((search: any) => {
            return this.filterCountry(cityName, countryName, search);
          });
        }),
        switchMap((data: any): any => {
          return this.searchWeatherByLatLong(data[0].lat, data[0].lon, units);
        }),
        catchError((e) => of(e))
      );
  }

  searchForecastCityName(
    cityName: string,
    countryName: string,
    units: string
  ): Observable<any> {
    return this.http
      .get(
        `${baseUrl}/geo/1.0/direct?q=${cityName},${countryName}'&limit=5&appid=${key}`
      )
      .pipe(
        map((data: any) => {
          return data.filter((search: any) => {
            return this.filterCountry(cityName, countryName, search);
          });
        }),
        switchMap((data: any): any => {
          return this.searchWeatherForecastLatLon(
            data[0].lat,
            data[0].lon,
            units
          );
        }),
        catchError((e) => of(e))
      );
  }

  //zip code search
  searchWeatherZip(
    zip: string,
    countryName: string,
    units: string
  ): Observable<any> {
    return this.http
      .get(`${baseUrl}/geo/1.0/zip?zip=${zip}&appid&appid=${key}`)
      .pipe(
        switchMap((data: any): any => {
          return this.searchWeatherByLatLong(data.lat, data.lon, units);
        }),
        catchError((e) => of(e))
      );
  }

  searchWeatherForecastZip(
    zip: string,
    countryName: string,
    units: string
  ): Observable<any> {
    return this.http
      .get(`${baseUrl}/geo/1.0/zip?zip=${zip}&appid&appid=${key}`)
      .pipe(
        switchMap((data: any): any => {
          return this.searchWeatherForecastLatLon(data.lat, data.lon, units);
        }),
        catchError((e) => of(e))
      );
  }

  getForecastDates(weather: any) {
    let todaysDate = new Date().getDate();
    let tomorrow = new Date().getDate() + 1;
    let forecast = [];

    return weather.list
      .map((day: any, index: number) => {
        let foreCastDay = new Date(day.dt_txt).getDate();
        if (foreCastDay === todaysDate) {
          return day;
        }
        if (foreCastDay === tomorrow && forecast.length !== 5) {
          forecast.push(day);
          return day;
        }

        if (day.dt_txt.includes("00:00:00")) {
          return day;
        }
      })
      .filter((day: any) => day != null);
  }

  filterCountry(cityName, countryName, search) {
    let country = Countries[search?.country];
    return (
      search?.state.toLowerCase() === countryName.toLowerCase() ||
      (country.toLowerCase() === countryName.toLowerCase() &&
        search.name.toLowerCase().includes(cityName.toLowerCase()))
    ); // some times citys have the same name in different countries, try and find the right city/country
  }
}
