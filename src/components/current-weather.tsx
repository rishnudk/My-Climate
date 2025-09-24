import type { GeocodingResponse , WeatherData}  from "../api/types";
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherProps {
    data : WeatherData;
    locationName?: GeocodingResponse;
}

const CurrentWeather = ( {data, locationName} : CurrentWeatherProps)  => {
    const {
        weather: [currentWeather] , 
        main: { temp, feels_like, temp_min, temp_max, humidity} ,
        wind: {speed} ,
    } = data;
  return (
    <Card className="overflow-hidden">
  
  <CardContent className="p-6">
    <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center">
                    <h2> {locationName?.name}

                    </h2>

                </div>

            </div>

        </div>

    </div>
    <p>Card Content</p>
  </CardContent>
  
</Card>
  )
}

export default CurrentWeather
