import { createAction, props } from "@ngrx/store";
import { SearchParams, Coordinates } from "../../types";

export const clearSearch = createAction(
  "[Search Page] Clear Weather",
  props<{ parameters: any }>()
);

export const loadWeather = createAction("[Search Page] Load Weather");

export const loadWeatherSuccess = createAction(
  "[Weather API] Load Weather Success",
  props<{ parameters: any }>()
);

export const loadWeatherFailure = createAction(
  "[Weather API] Load Weather Failure",
  props<{ error: any }>()
);

//lat lon actions
export const searchWeather = createAction(
  "[Search Page] Search Weather",
  props<{ coords: any }>()
);

export const searchWeatherLatLonForecast = createAction(
  "[Search Page] Search Weather Forecast by LatLon",
  props<{ coords: any }>()
);

export const loadWeatherLatLonForecastSuccess = createAction(
  "[Weather API] Load Weather Forecast by LatLon Success",
  props<{ forecast: any }>()
);

export const loadWeatherLatLonForecastFailure = createAction(
  "[Weather API] Load Weather Forecast by LatLon Failure",
  props<{ error: any }>()
);

//city actions
export const searchWeatherByCity = createAction(
  "[Search Page] Search Weather by City",
  props<{ parameters: any }>()
);

export const searchWeatherByCityForecast = createAction(
  "[Search Page] Search Weather Forecast by City",
  props<{ coords: any }>()
);

export const loadWeatherByCityForecastSuccess = createAction(
  "[Weather API] Load Weather Forecast by City Success",
  props<{ forecast: any }>()
);

export const loadWeatherByCityForecastFailure = createAction(
  "[Weather API] Load Weather Forecast by City Failure",
  props<{ error: any }>()
);

//zip code actions
export const searchWeatherByZip = createAction(
  "[Search Page] Search Weather by Zip",
  props<{ parameters: any }>()
);

export const searchWeatherByZipForecast = createAction(
  "[Search Page] Search Weather Forecast by Zip",
  props<{ coords: any }>()
);

export const loadWeatherByZipForecastSuccess = createAction(
  "[Weather API] Load Weather Forecast by Zip Success",
  props<{ forecast: any }>()
);

export const loadWeatherByZipForecastFailure = createAction(
  "[Weather API] Load Weather Forecast by Zip Failure",
  props<{ error: any }>()
);
