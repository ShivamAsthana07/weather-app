// ✅ Luxon import
import { DateTime } from "luxon";

const API_KEY = "f0a2553670c1976d95de150b5e2bf545";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeatherData = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    weather,
    speed,
  };
};

// ✅ Forecast formatter adapted for `forecast` API (2.5)
const formatForecastWeather = (data) => {
  const { city, list } = data;

  // Daily forecast → pick ~12:00 PM entries for next 5 days
  const daily = list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5)
    .map((d) => ({
      title: formatToLocalTime(d.dt, city.timezone, "ccc"),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    }));

  // Hourly forecast → next 5 intervals (~15 hours)
  const hourly = list.slice(0, 5).map((d) => ({
    title: formatToLocalTime(d.dt, city.timezone, "hh:mm a"),
    temp: d.main.temp,
    icon: d.weather[0].icon,
  }));

  return { timezone: city.timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeatherData = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeatherData);

  const { lat, lon } = formattedCurrentWeatherData;

  // ✅ Using `forecast` instead of `onecall`
  const formattedForecastWeatherData = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeatherData, ...formattedForecastWeatherData };
};

// ✅ Fixed timezone handling: forecast API gives offset in seconds
const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'h:mm a"
) =>
  DateTime.fromSeconds(secs) // interpret as UTC
    .toUTC()
    .plus({ seconds: offset }) // apply timezone offset
    .toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
