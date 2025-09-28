import React from 'react'
import { iconUrlFromCode } from '../services/WeatherService'

function Forecast({title, items}) {
  return (
    <div>
        <div class="flex items-center justify-start mt-6">
            <p class="font-medium text-white uppercase">{title}</p>
        </div>
        <hr class="my-2 text-white" />

        <div class="flex items-center justify-between text-white">
            {items.map((item) => (
                <div class="flex flex-col items-center justify-center">
                <p class="font-light text-sm text-white">{item.title}</p>
                <img src={iconUrlFromCode(item.icon)} alt="" class="w-12 my-1" />
                <p class="font-medium text-white">{`${item.temp.toFixed()}°` }</p>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Forecast