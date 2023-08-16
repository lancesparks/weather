import { AppState } from "../app.state";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { WeatherService } from "src/app/services/weather.service";
import * as action from "./search.actions";
import { catchError, of } from "rxjs";
import { filter, map, pairwise, switchMap, take, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Weather } from "src/app/types";

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private weatherService: WeatherService
  ) {}

  loadWeatherLatLon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.searchWeather),
      switchMap((actions: any) => {
        return this.weatherService
          .searchWeatherByLatLong(
            actions.coords.lat,
            actions.coords.lon,
            actions.coords.units
          )
          .pipe(
            map((weather: Partial<Weather>) => {
              return action.loadWeatherSuccess({ parameters: weather });
            })
          );
      }),
      catchError((error) => {
        return of(error).pipe(
          map(() => {
            return action.loadWeatherFailure({
              error: "Invalid latitude or longitude",
            });
          })
        );
      })
    )
  );
  loadForecastLatLon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.searchWeatherLatLonForecast),
      switchMap((actions: any) => {
        return this.weatherService
          .searchWeatherForecastLatLon(
            actions.coords.lat,
            actions.coords.lon,
            actions.coords.units
          )
          .pipe(
            map(
              (weather: any) => this.weatherService.getForecastDates(weather)
              //get the start of each day of a 5 day forecast
            ),
            map((weather) => {
              return action.loadWeatherLatLonForecastSuccess({
                forecast: weather,
              });
            })
          );
      }),
      catchError((error) => {
        return of(error).pipe(
          map(() => {
            return action.loadWeatherFailure({
              error: "Invalid latitude or longitude",
            });
          })
        );
      })
    )
  );

  loadForecastCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.searchWeatherByCityForecast),
      switchMap((actions: any) => {
        return this.weatherService
          .searchForecastCityName(
            actions.coords.city,
            actions.coords.country,
            actions.coords.units
          )
          .pipe(
            map(
              (weather: any) => this.weatherService.getForecastDates(weather) //get the start of each day of a 5 day forecast
            ),
            map((weather) => {
              return action.loadWeatherByCityForecastSuccess({
                forecast: weather,
              });
            })
          );
      }),
      catchError((error) => {
        return of(error).pipe(
          map(() => {
            return action.loadWeatherByCityForecastFailure({
              error: "Invalid city or country",
            });
          })
        );
      })
    )
  );

  loadWeatherCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.searchWeatherByCity),
      switchMap((actions: any) => {
        return this.weatherService
          .searchWeatherCityName(
            actions.parameters.city,
            actions.parameters.country,
            actions.parameters.units
          )
          .pipe(
            map((weather) => {
              return action.loadWeatherSuccess({ parameters: weather });
            })
          );
      }),
      catchError((error) => {
        return of(error).pipe(
          map(() => {
            return action.loadWeatherByCityForecastFailure({
              error: "Invalid city or country",
            });
          })
        );
      })
    )
  );

  loadForecastZip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.searchWeatherByZipForecast),
      switchMap((actions: any) => {
        console.log(actions);
        return this.weatherService
          .searchWeatherForecastZip(
            actions.coords.zip,
            actions.coords.country,
            actions.coords.units
          )
          .pipe(
            map(
              (weather: any) => this.weatherService.getForecastDates(weather) //get the start of each day of a 5 day forecast
            ),
            map((weather) => {
              return action.loadWeatherByCityForecastSuccess({
                forecast: weather,
              });
            })
          );
      }),
      catchError((error) => {
        return of(error).pipe(
          map(() => {
            return action.loadWeatherByCityForecastFailure({
              error: "Invalid zip code or country",
            });
          })
        );
      })
    )
  );

  loadWeatherZip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.searchWeatherByZip),
      switchMap((actions: any) => {
        return this.weatherService
          .searchWeatherZip(
            actions.parameters.zip,
            actions.parameters.country,
            actions.parameters.units
          )
          .pipe(
            map((weather) => {
              return action.loadWeatherSuccess({ parameters: weather });
            })
          );
      }),
      catchError((error) => {
        return of(error).pipe(
          map(() => {
            return action.loadWeatherByCityForecastFailure({
              error: "Invalid zip code or country",
            });
          })
        );
      })
    )
  );
}
