import * as action from "./search.actions";
import { createReducer, on } from "@ngrx/store";
import { SearchCoords, SearchParams, Weather } from "../../types";

export interface SearchState {
  coords?: SearchCoords | null;
  weather?: Weather | null;
  forecast?: Weather[] | Partial<Weather>[] | null;
  error?: string | null;
  status?: "pending" | "loading" | "error" | "success";
  type?: any;
}

export const initialState: SearchState = {
  coords: null,
  forecast: null,
  weather: null,
  error: null,
  status: "pending",
  type: null,
};

export const searchReducer = createReducer(
  initialState,

  on(
    action.searchWeatherByCity,
    (state: SearchState, { coords }: SearchParams): SearchState => {
      return {
        ...state,
        coords: coords,
        status: <const>"loading",
        error: null,
      };
    }
  ),

  on(action.loadWeather, (state: SearchState): SearchState => {
    return {
      ...state,
      status: <const>"loading",
      error: null,
    };
  }),
  on(
    action.loadWeatherSuccess,
    (state: SearchState, { weather }: SearchState): SearchState => {
      console.log(weather);
      return {
        ...state,
        weather: weather,
        error: null,
        status: "success",
      };
    }
  ),
  on(
    action.loadWeatherFailure,
    (state: SearchState, { error }: SearchState) => ({
      ...state,
      status: <const>"error",
      error: error,
    })
  ),

  ///lat lon reducers

  on(
    action.searchWeatherLatLonForecast,
    (state: SearchState, { coords }: SearchParams): SearchState => {
      return {
        ...state,
        coords: coords,
        status: <const>"loading",
      };
    }
  ),

  on(
    action.loadWeatherLatLonForecastSuccess,
    (state: SearchState, { forecast }: SearchState): SearchState => {
      return {
        ...state,
        forecast: forecast,
        error: null,
        status: <const>"success",
      };
    }
  ),
  on(
    action.loadWeatherLatLonForecastFailure,
    (state: SearchState, { error }: SearchState): SearchState => ({
      ...state,
      status: <const>"error",
      error: error,
    })
  ),

  // city reducers

  on(
    action.searchWeatherByCityForecast,
    (state: SearchState, { coords }: SearchParams): SearchState => {
      return {
        ...state,
        coords: coords,
        status: <const>"loading",
        error: null,
      };
    }
  ),

  on(
    action.loadWeatherByCityForecastSuccess,
    (state: SearchState, { forecast }: SearchState): SearchState => {
      return {
        ...state,
        forecast: forecast,
        error: null,
        status: <const>"success",
      };
    }
  ),
  on(
    action.loadWeatherByCityForecastFailure,
    (state: SearchState, { error }: SearchState) => {
      return {
        ...state,
        status: <const>"error",
        error: error,
      };
    }
  ),

  //zip reducers
  on(
    action.searchWeatherByZip,
    (state: SearchState, { coords }: SearchParams) => {
      return {
        ...state,
        coords: coords,
        status: <const>"loading",
        error: null,
      };
    }
  ),

  on(
    action.searchWeatherByZipForecast,
    (state: SearchState, { coords }: SearchParams): SearchState => {
      return {
        ...state,
        coords: coords,
        status: <const>"loading",
        error: null,
      };
    }
  ),

  on(
    action.loadWeatherByZipForecastSuccess,
    (state: SearchState, { forecast }): SearchState => {
      console.log(forecast);
      return {
        ...state,
        forecast: forecast,
        error: null,
        status: <const>"success",
      };
    }
  ),
  on(
    action.loadWeatherByZipForecastFailure,
    (state: SearchState, { error }: SearchState): SearchState => {
      return {
        ...state,
        status: <const>"error",
        error: error,
      };
    }
  )
);

// zip reducers
