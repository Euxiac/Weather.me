import OpenWeather_key, { WorldTime_key } from "./credentials";
import axios from "axios";

const useCredentials= false;
const openWeather_key = () => {return useCredentials ? OpenWeather_key : "null"}
const worldTime_key = () => {return useCredentials ? WorldTime_key : "null"}

// {} => destructuring, when you have an object and just want one thing out of that object
const location = { lat: -31.9558933, lon: 115.8605855 };

export const fetchCurrentWeather = () => {
    return axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&lang=en&appid=${openWeather_key()}&exclude=minutely,hourly,daily,alerts`
  );
};

export const fetch8DaysWeather = () => {
  return axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&lang=en&appid=${openWeather_key()}&exclude=current,minutely,hourly,alerts`
  );
};

export const fetchCurrentTime = () => {
  return axios.get(
    `https://api.api-ninjas.com/v1/worldtime?lat=${location.lat}&lon=${location.lon}`,
    { headers: { "X-Api-Key": worldTime_key() } }
  );
};
