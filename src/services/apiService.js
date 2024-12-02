import axios from "axios";
import * as appConfig from "../appConfig";
import mock_coordinates from "../data/mock_coordinates.json"

// {} => destructuring, when you have an object and just want one thing out of that object
const location = mock_coordinates;

const TOKEN = appConfig.storageMode.getItem("user_token");

function handleTokenTimeout(callback) {}

async function handleError(error, callback) {
  console.log(`handling error ${error.status}`)
  switch (error.status) {
    case 403:
      console.log(`${error.status} refreshing token`);
      await getAuth();
      return callback();
      break;

    case 401:
      break;

    default:
      throw new Error(
        `Error fetching current weather from query: ${error.message}`
      );
      break;
  }
}
export const fetchCurrentWeather = async () => {
  if (appConfig.useMockData) {
    throw new Error(`using mock data`);
  } else {
    try {
      const apiUrl = `${appConfig.APIAddress}/api/fetch-weather/current/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log("fetching new currentWeather");
      // Return the response data (not `response.data` if you want only the results)
      return response.data; // The actual data returned by the API
    } catch (error) {
      return await handleError(error, fetchCurrentWeather);
    }
  }
};

export const fetch8DaysWeather = async () => {
  if (appConfig.useMockData) {
    throw new Error(`using mock data`);
  } else {
    try {
      const apiUrl = `${appConfig.APIAddress}/api/fetch-weather/coming-week/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log("fetching new coming week Weather");
      // Return the response data (not `response.data` if you want only the results)
      return response.data; // The actual data returned by the API
    } catch (error) {
      return await handleError(error, fetchCurrentWeather);
    }
  }
};

export const fetchCurrentTime = async () => {
  if (appConfig.useMockData) {
    throw new Error(`using mock data`);
  } else {
    try {
      const apiUrl = `${appConfig.APIAddress}/api/fetch-time/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log("fetching new currentTime");
      // Return the response data (not `response.data` if you want only the results)
      return response.data; // The actual data returned by the API
    } catch (error) {
      return await handleError(error, fetchCurrentWeather);
    }
  }
};

export const fetchCountries = async () => {
  if (appConfig.useMockData) {
    throw new Error(`using mock data`);
  }
};

export const fetchLocationData = async () => {
  if (appConfig.useMockData) {
    throw new Error(`using mock data`);
  } else {
    try {
      //console.log(TOKEN);
      const apiUrl = `${appConfig.APIAddress}/location/data`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log("fetching new location data");
      return response.data; // The actual data returned by the API
    } catch (error) {
      return await handleError(error, fetchCurrentWeather);
    }
  }
};

export const fetchCoordinates = async () => {};

export const getAuth = async () => {
  try {
    //console.log("start");
    const apiUrl = `${appConfig.APIAddress}/auth/get`;
    const response = await axios.get(apiUrl, {});
    //console.log("fetching new auth");
    appConfig.storageMode.setItem("user_token", response.data);
    //console.log(TOKEN);
  } catch (error) {
    return await handleError(error, fetchCurrentWeather);
  }
};
