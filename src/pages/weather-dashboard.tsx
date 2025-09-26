import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { useGeolocation } from "../hooks/use-geolocation";
import WeatherSkeleton from "../components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "../hooks/use-weather";
import CurrentWeather from "../components/current-weather";
import HourlyTemprature from "@/components/hourly-temprature";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  // Only run queries if coordinates exist
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  // Refetch when coordinates change
  useEffect(() => {
    if (coordinates) {
      console.log("Coordinates updated:", coordinates);
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }, [coordinates]);

  const handleRefresh = () => {
    getLocation();
  };

  // Location loading
  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  // Location error
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // If no coordinates yet
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Log queries for debugging
  console.log("Weather data:", weatherQuery.data);
  console.log("Weather error:", weatherQuery.error);
  console.log("Forecast data:", forecastQuery.data);
  console.log("Forecast error:", forecastQuery.error);
  console.log("Location data:", locationQuery.data);

  // Weather API errors
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Weather API Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Could not fetch weather data. Please try again.</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // While loading
  if (
    weatherQuery.isLoading ||
    forecastQuery.isLoading ||
    !weatherQuery.data ||
    !forecastQuery.data
  ) {
    return <WeatherSkeleton />;
  }
  const location = locationQuery.data?.[0]
  const locationName = locationQuery.data?.[0]?.name || "Unknown Location";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      {/* Weather info */}
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4" >

        
        <CurrentWeather data={weatherQuery.data} locationName={location} />
        {/* TODO: Forecast cards, hourly weather, etc */}
        <HourlyTemprature data={forecastQuery.data} />
      </div>
      <div>
         <WeatherDetails/>
      </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
