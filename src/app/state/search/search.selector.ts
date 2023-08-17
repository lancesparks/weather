import { createSelector } from "@ngrx/store";
import { SearchState } from "./search.reducer";
import { AppState } from "../app.state";

export const selectWeather = (state: AppState) => state.weather;

export const selectLoading = createSelector(
  selectWeather,
  (state: SearchState) => {
    return state.status;
  }
);

export const selectCurrentWeather = createSelector(
  selectWeather,
  (state: SearchState) => {
    return state.weather;
  }
);

export const selectForecast = createSelector(
  selectWeather,
  (state: SearchState) => {
    {
      return state.forecast;
    }
  }
);

export const selectError = createSelector(
  selectWeather,
  (state: SearchState) => {
    return state.error;
  }
);
