import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";
import { Store } from "@ngrx/store";
import * as action from "../../state/search/search.actions";
import * as state from "../../state/search/search.selector";
import { FormBuilder } from "@angular/forms";
import { tap, map } from "rxjs";
import { Images } from "../shared/getImages";
import { Days } from "../shared/days";
import { WeatherValidator } from "../../validators/weatherValidator";
import { UnitType, Weather } from "../../types";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  constructor(private store: Store, private fb: FormBuilder) {}

  public weatherImage: string = "../../assets/images/weather_bug.png";
  public viewFilters: boolean = false;
  public showError: boolean = false;
  public previousSearch;
  public fetchError;
  public today;
  public unitType = "F";

  public currentWeather$ = this.store.select(state.selectCurrentWeather).pipe(
    tap((data: Weather) => {
      if (!data) {
        return;
      }
      if (data.weather) {
        this.unitType =
          this.weatherForm.get("units").value === "imperial" ? "F" : "C";
        this.weatherImage =
          Images[data?.weather[0]?.main?.toLowerCase() as keyof typeof Images];
        this.previousSearch = data;
      }
    }),
    map((data: Weather) => (!data?.weather ? this.previousSearch : data))
  );

  public currentForecast$ = this.store.select(state.selectForecast);
  public error$ = this.store.select(state.selectError);

  public weatherForm = this.fb.group(
    {
      searchType: ["city"],
      city: ["Orlando"],
      country: ["Florida"],
      zip: [""],
      lat: [""],
      lon: [""],
      units: ["imperial"],
    },
    {
      validators: [WeatherValidator()],
    }
  );

  ngOnInit(): void {
    this.handleSearch();
    this.today = new Date();
  }

  handleSearch() {
    const search = this.weatherForm.get("searchType").value;

    this.store.dispatch(action.loadWeather());

    if (search === "lat-lon") {
      this.searchWeatherLatLon();
    }

    if (search === "city") {
      this.searchWeatherCity();
    }

    if (search === "zip") {
      this.searchWeatherZip();
    }
  }

  searchWeatherLatLon() {
    if (this.weatherForm.errors) {
      this.showError = true;
      return;
    }

    let lat = this.weatherForm.get("lat")?.value;
    let lon = this.weatherForm.get("lon")?.value;
    let units = this.weatherForm.get("units")?.value;
    if (lat == null || lat === "" || lon == null || lon === "") {
      return;
    }

    this.weatherForm.get("city").setValue("");
    this.weatherForm.get("country").setValue("");
    this.weatherForm.get("zip").setValue("");

    this.store.dispatch(
      action.searchWeather({ coords: { lat: lat, lon: lon, units: units } })
    );
    //load default weather forecast
    this.store.dispatch(
      action.searchWeatherLatLonForecast({
        coords: { lat: lat, lon: lon, units: units },
      })
    );
  }

  searchWeatherCity() {
    if (this.weatherForm.errors) {
      this.showError = true;
      return;
    }
    let city = this.weatherForm.get("city")?.value;
    let country = this.weatherForm.get("country")?.value;
    let units = this.weatherForm.get("units")?.value;
    if (city == null || city === "" || country == null || country === "") {
      return;
    }
    this.weatherForm.get("lat").setValue("");
    this.weatherForm.get("lon").setValue("");
    this.weatherForm.get("zip").setValue("");

    this.store.dispatch(
      action.searchWeatherByCity({ coords: { city, country, units } })
    );

    this.store.dispatch(
      action.searchWeatherByCityForecast({
        coords: { city, country, units },
      })
    );
  }

  searchWeatherZip() {
    if (this.weatherForm.errors) {
      this.showError = true;
      return;
    }

    let zip = this.weatherForm.get("zip")?.value;
    let country = this.weatherForm.get("country")?.value;
    let units = this.weatherForm.get("units")?.value;
    if (zip == null || zip === "" || country == null || country === "") {
      return;
    }

    this.weatherForm.get("lat").setValue("");
    this.weatherForm.get("lon").setValue("");
    this.weatherForm.get("city").setValue("");

    this.store.dispatch(
      action.searchWeatherByZip({ coords: { zip, country, units } })
    );

    this.store.dispatch(
      action.searchWeatherByZipForecast({ coords: { zip, country, units } })
    );
  }

  getDayName(date) {
    let index = new Date(date).getDay();
    return Days[index];
  }

  updateSearchType(e) {
    this.weatherForm.get("searchType").setValue(e.target.value);
  }

  updateUnit(e) {
    this.weatherForm.get("units").setValue(e.target.value);
  }

  toggleFilter() {
    this.viewFilters = !this.viewFilters;
  }
}
