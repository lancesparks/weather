import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

// eslint-disable-next-line func-style, prefer-arrow/prefer-arrow-functions
export function WeatherValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {
    let searchType = form.get("searchType").value;

    if (searchType === "city") {
      if (form.get("country").value == "" && form.get("city").value == "") {
        return { error: "City and Country are required" };
      }

      if (form.get("country").value == "" && form.get("city").value != "") {
        return { error: "Country is required" };
      }
      if (form.get("country").value != "" && form.get("city").value == "") {
        return { error: "City is required" };
      }
    }

    if (searchType === "zip") {
      if (form.get("country").value == "" && form.get("zip").value == "") {
        return { error: "Zip code and Country are required" };
      }

      if (form.get("country").value == "" && form.get("zip").value != "") {
        return { error: "Country is required" };
      }
      if (form.get("country").value != "" && form.get("zip").value == "") {
        return { error: "Zip code is required" };
      }
    }
    if (searchType === "lat-lon") {
      if (form.get("lat").value == "" && form.get("lon").value == "") {
        return { error: "Latitude and Longitude are required" };
      }
      if (form.get("lat").value == "" && form.get("lon").value != "") {
        return { error: "Latitude is required" };
      }
      if (form.get("lat").value != "" && form.get("lon").value == "") {
        return { error: "Longitude is required" };
      }
    }

    return null;
  };
}
