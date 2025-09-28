import React from 'react'
import { formatToLocalTime } from '../services/WeatherService'

function TimeAndLocation({weather: {dt, timezone, name, country}}) {
  return (
    <div>
        <div class="flex items-center justify-center my-6">
            <p class="font-light text-white text-md">{formatToLocalTime(dt, timezone)}</p>
        </div>
        <div class="flex items-center justify-center my-6">
            <p class="font-medium text-white text-xl text-center">{`${name}, ${country}`}</p>
        </div>
    </div>
    
  )
}

export default TimeAndLocation