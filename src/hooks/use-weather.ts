import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "../api/weather";
import { Coordinates } from "../api/types";


export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    location: (coords: Coordinates) => ["forecast", coords] as const,
} as const;
 
export function useWeatherQuery(coordinates:  Coordinates  | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat : 0, lon : 0}) ,
        queryFn: () => 
            coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !! coordinates,
    });
}

export function useForecastQuery(coordinates:  Coordinates  | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat : 0, lon : 0}) ,
        queryFn: () => 
            coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !! coordinates,
    });
}

export function useReverseGeocodeQuery(coordinates:  Coordinates  | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat : 0, lon : 0}) ,
        queryFn: () => 
            coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !! coordinates,
    });
}