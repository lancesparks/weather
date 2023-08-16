import * as action from "./search.actions";
import { createReducer, on } from "@ngrx/store";
import { Weather } from "../../types";

export interface SearchState {
  parameters: Weather | null;
  forecast: Weather[] | null;
  error: string | null;
  status: "pending" | "loading" | "error" | "success";
}

export const initialState: any = {
  parameters: null,
  forecast: null,
  error: null,
  status: "pending",
};

export const searchReducer = createReducer(
  initialState,
  on(action.searchWeather, (state: any, { parameters }: any) => {
    return {
      ...state,
      parameters: parameters,
      error: null,
    };
  }),

  on(action.searchWeatherByCity, (state: any, { parameters }: any) => {
    return {
      ...state,
      parameters: parameters,
      status: <const>"loading",
      error: null,
    };
  }),
  on(action.clearSearch, (state: SearchState, { content }: any) => ({
    ...state,
    parameters: null,
  })),
  on(action.loadWeather, (state: SearchState) => {
    return {
      ...state,
      status: <const>"loading",
      error: null,
    };
  }),
  on(action.loadWeatherSuccess, (state, { parameters }) => {
    return {
      ...state,
      parameters: parameters,
      error: null,
      status: "success",
    };
  }),
  on(action.loadWeatherFailure, (state: SearchState, { error }: any) => ({
    ...state,
    status: <const>"error",
    error: error,
  })),

  ///lat lon reducers

  on(action.searchWeatherLatLonForecast, (state: any, { coords }) => {
    return {
      ...state,
      coords: coords,
      status: <const>"loading",
    };
  }),

  on(action.loadWeatherLatLonForecastSuccess, (state, { forecast }) => {
    return {
      ...state,
      forecast: forecast,
      error: null,
      status: "success",
    };
  }),
  on(
    action.loadWeatherLatLonForecastFailure,
    (state: SearchState, { error }: any) => ({
      ...state,
      status: <const>"error",
      error: error,
    })
  ),

  // city reducers

  on(action.searchWeatherByCityForecast, (state: any, { coords }) => {
    return {
      ...state,
      coords: coords,
      status: <const>"loading",
      error: null,
    };
  }),

  on(action.loadWeatherByCityForecastSuccess, (state, { forecast }) => {
    return {
      ...state,
      forecast: forecast,
      error: null,
      status: "success",
    };
  }),
  on(
    action.loadWeatherByCityForecastFailure,
    (state: SearchState, { error }: any) => {
      return {
        ...state,
        status: <const>"error",
        error: error,
      };
    }
  ),

  //zip reducers
  on(action.searchWeatherByZip, (state: any, { parameters }) => {
    return {
      ...state,
      parameters: parameters,
      status: <const>"loading",
      error: null,
    };
  }),

  on(action.searchWeatherByZipForecast, (state: any, { coords }) => {
    return {
      ...state,
      coords: coords,
      status: <const>"loading",
      error: null,
    };
  }),

  on(action.loadWeatherByZipForecastSuccess, (state, { forecast }) => {
    return {
      ...state,
      forecast: forecast,
      error: null,
      status: "success",
    };
  }),
  on(
    action.loadWeatherByZipForecastFailure,
    (state: SearchState, { error }: any) => {
      return {
        ...state,
        status: <const>"error",
        error: error,
      };
    }
  )
);

// zip reducers
