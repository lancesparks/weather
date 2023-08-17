import { createAction, props } from "@ngrx/store";
import { Weather, SearchCoords } from "../../types";

export const clearSearch = createAction(
  "[Search Page] Clear Weather",
  props<{ parameters: SearchCoords }>()
);

export const loadWeather = createAction("[Search Page] Load Weather");

export const loadWeatherSuccess = createAction(
  "[Weather API] Load Weather Success",
  props<{ weather: Weather }>()
);

export const loadWeatherFailure = createAction(
  "[Weather API] Load Weather Failure",
  props<{ error: string }>()
);

//lat lon actions
export const searchWeather = createAction(
  "[Search Page] Search Weather",
  props<{ coords: SearchCoords }>()
);

export const searchWeatherLatLonForecast = createAction(
  "[Search Page] Search Weather Forecast by LatLon",
  props<{ coords: SearchCoords }>()
);

export const loadWeatherLatLonForecastSuccess = createAction(
  "[Weather API] Load Weather Forecast by LatLon Success",
  props<{ forecast: any }>()
);

export const loadWeatherLatLonForecastFailure = createAction(
  "[Weather API] Load Weather Forecast by LatLon Failure",
  props<{ error: string }>()
);

//city actions
export const searchWeatherByCity = createAction(
  "[Search Page] Search Weather by City",
  props<{ coords: SearchCoords }>()
);

export const searchWeatherByCityForecast = createAction(
  "[Search Page] Search Weather Forecast by City",
  props<{ coords: SearchCoords }>()
);

export const loadWeatherByCityForecastSuccess = createAction(
  "[Weather API] Load Weather Forecast by City Success",
  props<{ forecast: Partial<Weather>[] }>()
);

export const loadWeatherByCityForecastFailure = createAction(
  "[Weather API] Load Weather Forecast by City Failure",
  props<{ error: string }>()
);

//zip code actions
export const searchWeatherByZip = createAction(
  "[Search Page] Search Weather by Zip",
  props<{ coords: SearchCoords }>()
);

export const searchWeatherByZipForecast = createAction(
  "[Search Page] Search Weather Forecast by Zip",
  props<{ coords: SearchCoords }>()
);

export const loadWeatherByZipForecastSuccess = createAction(
  "[Weather API] Load Weather Forecast by Zip Success",
  props<{ forecast: any }>()
);

export const loadWeatherByZipForecastFailure = createAction(
  "[Weather API] Load Weather Forecast by Zip Failure",
  props<{ error: string }>()
);
