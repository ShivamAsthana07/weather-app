import React, { useState } from 'react'
import {UilSearch, UilLocationPoint} from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

function Inputs({setQuery, units, setUnits}) {

  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '' ) setQuery({q: city});
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching user location');
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Successfully fetched location');
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({lat, lon});
      });
    }
  }

  return (
    <div class="flex justify-center my-6">
        <div class="flex flex-row w-3/4 items-center justify-center space-x-4">
            <input type="text" placeholder="search for city..." class="rounded-2xl placeholder:lowercase capitalize text-md font-normal p-2 w-full shadow-xl focus:outline-none bg-white" onChange={e => setCity(e.target.value)} value={city} />
            <UilSearch size={25} class="text-white cursor-pointer transition ease-out hover:scale-125 " onClick={handleSearchClick}  />
            <UilLocationPoint size={25} class="text-white cursor-pointer transition ease-out hover:scale-125 " onClick={handleLocationClick}  />
        </div>
        <div class="flex flex-row w-1/4 items-center justify-center space-x-4">
            <button name='metric' class="font-light text-white text-lg mr-1 hover:scale-125 transition ease-out" onClick={() => setUnits('metric')}>°C</button>
            <p class="font-light text-white text-lg mr-1">|</p>
            <button name='imperial' class="font-light text-white text-lg hover:scale-125 transition ease-out" onClick={() => setUnits('imperial')}>°F</button>
        </div>
    </div>
  )
}

export default Inputs