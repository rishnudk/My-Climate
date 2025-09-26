import type { WeatherData } from "@/api/types"
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";

interface WeeatherDetailsProps {
    data : WeatherData
}

const WeatherDetails = ({data} : WeeatherDetailsProps) => {

    const { wind, main, sys} = data;

    const getWindDirection = (degree:number) => {
        const directions = [ "N", "NE", "E", 'SE', "S", "SW", "W", "NW"]

        const index = 
        Math.round(((degree %= 360) < 0 ? degree + 360 : degree ) / 45) % 8 ;

        return directions[index]
    }



    const formatTime = (timestamp: number) => {
        return format (new Date(timestamp * 1000), "h:mm a")
    }

    const details = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        } , {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        } , {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge ,
            color: "text-purple-500"
        } , 
{
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°) `,
            icon: Compass ,
            color: "text-green-500"
        } , 

    ]
  return (
    <div>
      weatherdetails
    </div>
  )
}

export default WeatherDetails
