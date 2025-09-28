import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
        {
            id: 1,
            title: 'London',
        },
        {
            id: 2,
            title: 'Madrid',
        },
        {
            id: 3,
            title: 'Tokyo',
        },
        {
            id: 4,
            title: 'Mumbai',
        },
        {
            id: 5,
            title: 'Paris',
        },
    ]

  return (
    <div class="flex items-center justify-around my-6">
        {cities.map((city) => (
            <button class="font-medium text-white text-lg" key={city.id} onClick={() => setQuery({q: city.title})}>{city.title}</button>
        ))}
    </div>
  )
}

export default TopButtons