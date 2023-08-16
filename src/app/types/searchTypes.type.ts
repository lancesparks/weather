export interface SearchTypes {
  type: "coordinates" | "name" | "zip";
}

export interface SearchParams {
  lat?: number;
  lon?: number;
  units?: "imperial" | "metric";
  cityName?: string;
  countryName?: string;
  zip?: string;
}
