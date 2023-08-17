export interface SearchTypes {
  type: "coordinates" | "name" | "zip";
}

export interface SearchParams {
  coords?: SearchCoords;
}

export interface SearchCoords {
  city?: string;
  country?: string;
  units?: string;
  lat?: number;
  lon?: number;
  type?: string;
  zip?: string;
}

export interface City {
  country: string;
  lat: number;
  lon: number;
  name: string;
  local_names?: any;
  state: string;
}

export interface UnitType {
  units: "imperial" | "metric";
}

export interface ErrorResponse {
  cod: string;
  message: string;
}
