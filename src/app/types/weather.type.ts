export interface Weather {
  base: string;
  clouds: {
    all: string;
  };
  cod: number;
  coord: Coordinates;
  dt: number;
  id: number;
  main: Temp;
  name: string;
  sys: Sys;
  timeZone: number;
  visibility: number;
  weather: WeatherData[];
  wind: Wind;
}

export interface Coordinates {
  lat: number;
  lon: number;
}
export interface Temp {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface Sys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface WeatherData {
  description: string;
  icon: string;
  id: number;
  main: string;
}
export interface Wind {
  deg: number;
  gust: number;
  speed: number;
}
