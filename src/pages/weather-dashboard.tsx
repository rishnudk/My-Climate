
import React from 'react'
import {Button} from "@/components/ui/button"
import {RefreshCw} from "lucide-react";
import { useGeolocation } from '../hooks/use-geolocation';

const WeatherDashboard = () => {

  const { coordinates, error : locationError, getLocation, isLoading : locationLoading} = useGeolocation()
  console.log(coordinates);

  const handlerefresh = () => {
    getLocation();
    if(coordinates) {
      //reload weather data
    }
  }
  

  return (
    <div className='space-y-4' >
      {/* favoutite cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button 
        variant={"outline"}
        size={"icon"}
        // onClick={handleRefresh}
        // disables={}
        >
          <RefreshCw className='h-4 w-4'/>
        </Button>
      </div>

    {/* current and Hourly Weather */}
    </div>
  )
}

export default WeatherDashboard