import React from 'react'
import { UilTemperature, UilTear, UilWind, UilSun, UilSunset, UilArrowUp, UilArrowDown } from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrlFromCode } from '../services/WeatherService'

function Temp({weather: {details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone}}) {
  return (
    <div>
        <div class="flex items-center justify-center my-6 text-xl text-cyan-300">
            <p>{`${details}`}</p>
        </div>
        <div class="flex flex-row items-center justify-between text-white py-3">
            <img src={iconUrlFromCode(icon)} alt="" class="w-20"/>
            <p class="text-5xl">{`${temp.toFixed()}°`}</p>

            <div class="flex flex-col space-y-2">
                <div class="flex font-light text-sm items-center justify-center">
                    <UilTemperature size={18} class="mr-1" />
                    Real Feel: <span class="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
                </div>
                <div class="flex font-light text-sm items-center justify-center">
                    <UilTear size={18} class="mr-1" />
                    Humidity: <span class="font-medium ml-1">{`${humidity}`}</span>
                </div>
                <div class="flex font-light text-sm items-center justify-center">
                    <UilWind size={18} class="mr-1" />
                    Wind: <span class="font-medium ml-1">{`${speed.toFixed()}`}</span> <span class="font-light">km/h</span>
                </div>
            </div>
        </div>
        <div class="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
            <UilSun />
            <p class="font-light">Rise: <span class="font-medium ml-1">{`${formatToLocalTime(sunrise, timezone, "hh:mm a")}`}</span></p>
            <p class="font-light">|</p>
            <UilSunset />
            <p class="font-light">Set: <span class="font-medium ml-1">{`${formatToLocalTime(sunset, timezone, "hh:mm a")}`}</span></p>
            <p class="font-light">|</p>
            <UilArrowUp />
            <p class="font-light">High: <span class="font-medium ml-1">{`${temp_max.toFixed()}°`}</span></p>
            <p class="font-light">|</p>
            <UilArrowDown />
            <p class="font-light">Low: <span class="font-medium ml-1">{`${temp_min.toFixed()}°`}</span></p>
        </div>
    </div>
  )
}

export default Temp