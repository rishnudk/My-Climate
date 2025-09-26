import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "../api/weather";
import { Coordinates } from "../api/types";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: coordinates ? WEATHER_KEYS.weather(coordinates) : ["weather", "empty"],
    queryFn: async () => {
      if (!coordinates) throw new Error("Coordinates required");
      return weatherAPI.getCurrentWeather(coordinates);
    },
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: coordinates ? WEATHER_KEYS.forecast(coordinates) : ["forecast", "empty"],
    queryFn: async () => {
      if (!coordinates) throw new Error("Coordinates required");
      return weatherAPI.getForecast(coordinates);
    },
    enabled: !!coordinates,
  });
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: coordinates ? WEATHER_KEYS.location(coordinates) : ["location", "empty"],
    queryFn: async () => {
      if (!coordinates) throw new Error("Coordinates required");
      return weatherAPI.reverseGeocode(coordinates);
    },
    enabled: !!coordinates,
  });
}
