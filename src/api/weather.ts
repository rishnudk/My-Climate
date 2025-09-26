import { API_CONFIG } from "./config";
import {
  Coordinates,
  ForecastData,
  Geocodingresponse,
  WeatherData,
} from "./types";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });

    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Weather API Error: ${response.status} - ${JSON.stringify(data)}`
      );
    }

    return data;
  }

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
  if (lat == null || lon == null) {
    throw new Error("Coordinates are required");
  }
  const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
    lat: lat.toString(),
    lon: lon.toString(),
    units: API_CONFIG.DEFAULT_PARAMS.units,
  });
  return this.fetchData<WeatherData>(url);
}



  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return this.fetchData<ForecastData>(url);
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<Geocodingresponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });

    return this.fetchData<Geocodingresponse[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();
