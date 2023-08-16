import { createSelector } from "@ngrx/store";
import { SearchState } from "./search.reducer";
import { AppState } from "../app.state";

export const selectWeather = (state: any) => state.weather;

export const selectLoading = createSelector(selectWeather, (state: any) => {
  return state.status;
});

export const selectCoordinates = createSelector(selectWeather, (state: any) => {
  return state.parameters.coord;
});

export const selectCurrentWeather = createSelector(
  selectWeather,
  (state: any) => {
    return state.parameters;
  }
);

export const selectForecast = createSelector(selectWeather, (state: any) => {
  {
    return state.forecast;
  }
});

export const selectError = createSelector(selectWeather, (state: any) => {
  return state.error;
});
