import { useEffect, useState } from 'react'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import Temp from './components/Temp'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './services/WeatherService'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const[query, setQuery] = useState({q: 'mumbai'});
  const[units, setUnits] = useState('metric');
  const[weather, setWeather] = useState(null);

  useEffect (() => {const fetchWeather = async () =>{

    const message = query.q ? query.q : 'current location';
    toast.info('Fetching weather for ' + message);

    await getFormattedWeatherData({...query, units}).then(data =>{
      toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`);
      setWeather(data)});
  };
  fetchWeather();
  }, [query, units]);

  const background = () => {
    if (weather) {
      const threshold = units === 'metric' ? 20 : 60;
      if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700';
      else return 'from-yellow-700 to-orange-700';
    }
  }

  return (
    <>
      <div class={`mx-auto max-w-screen-md my-6 py-10 px-32 bg-gradient-to-br ${background()} h-fit shadow-xl rounded-4xl`}>
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <Temp weather={weather} />
            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>  
        )}

        <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>
      </div>
    </>
  )
}

export default App
