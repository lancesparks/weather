import { AppState } from "../app.state";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { WeatherService } from "src/app/services/weather.service";
import * as action from "./search.actions";
import { catchError, of } from "rxjs";
import { filter, map, pairwise, switchMap, take, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Weather, SearchParams, ForecastResponse } from "src/app/types";

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  loadWeatherLatLon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.searchWeather),
      switchMap((actions: SearchParams) => {
        return this.weatherService
          .searchWeatherByLatLong(
            actions.coords.lat,
            actions.coords.lon,
            actions.coords.units
          )
          .pipe(
            map((weather: Weather) => {
              return action.loadWeatherSuccess({ weather: weather });
            })
          );
      }),
      catchError((error: Error) => {
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
      switchMap((actions: SearchParams) => {
        return this.weatherService
          .searchWeatherForecastLatLon(
            actions.coords.lat,
            actions.coords.lon,
            actions.coords.units
          )
          .pipe(
            map(
              (weather: ForecastResponse) =>
                this.weatherService.getForecastDates(weather)
              //get the start of each day of a 5 day forecast
            ),
            map((weather: Partial<Weather>[]) => {
              return action.loadWeatherLatLonForecastSuccess({
                forecast: weather,
              });
            }),
            catchError((error: Error) => {
              return of(error).pipe(
                map((e) => {
                  console.log(e);
                  return action.loadWeatherByCityForecastFailure({
                    error: "Invalid latitude or longitude",
                  });
                })
              );
            })
          );
      }),
      catchError((error: Error) => {
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
      switchMap((actions: SearchParams) => {
        return this.weatherService
          .searchForecastCityName(
            actions.coords.city,
            actions.coords.country,
            actions.coords.units
          )
          .pipe(
            map(
              (weather: ForecastResponse) =>
                this.weatherService.getForecastDates(weather) //get the start of each day of a 5 day forecast
            ),
            map((weather: Partial<Weather>[]) => {
              return action.loadWeatherByCityForecastSuccess({
                forecast: weather,
              });
            }),
            catchError((error: Error) => {
              return of(error).pipe(
                map((e) => {
                  console.log(e);
                  return action.loadWeatherByCityForecastFailure({
                    error: "Invalid city or country",
                  });
                })
              );
            })
          );
      }),
      catchError((error: Error) => {
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
      switchMap((actions: SearchParams) => {
        return this.weatherService
          .searchWeatherCityName(
            actions.coords.city,
            actions.coords.country,
            actions.coords.units
          )
          .pipe(
            map((weather: Weather) => {
              return action.loadWeatherSuccess({ weather: weather });
            })
          );
      }),
      catchError((error: Error) => {
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
      switchMap((actions: SearchParams) => {
        return this.weatherService
          .searchWeatherForecastZip(
            actions.coords.zip,
            actions.coords.country,
            actions.coords.units
          )
          .pipe(
            map(
              (weather: ForecastResponse) =>
                this.weatherService.getForecastDates(weather) //get the start of each day of a 5 day forecast
            ),
            map((weather: Partial<Weather>[]) => {
              return action.loadWeatherByCityForecastSuccess({
                forecast: weather,
              });
            }),
            catchError((error: Error) => {
              return of(error).pipe(
                map((e) => {
                  return action.loadWeatherByCityForecastFailure({
                    error: "Invalid zip code or country",
                  });
                })
              );
            })
          );
      }),
      catchError((error: Error) => {
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
      switchMap((actions: SearchParams) => {
        return this.weatherService
          .searchWeatherZip(
            actions.coords.zip,
            actions.coords.country,
            actions.coords.units
          )
          .pipe(
            map((weather: Weather) => {
              return action.loadWeatherSuccess({ weather: weather });
            })
          );
      }),
      catchError((error: Error) => {
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
