import axios from "axios";
import * as appConfig from "../appConfig";

// {} => destructuring, when you have an object and just want one thing out of that object
const location = { lat: -31.9558933, lon: 115.8605855 };

export const fetchCurrentWeather = async () => {
  if (appConfig.useMockData) {
    throw new Error(
      `using mock data`
    );
  } else {
    try {
      const apiUrl = `${appConfig.APIAddress}/api/fetch-weather/current/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("fetching new currentWeather");
      // Return the response data (not `response.data` if you want only the results)
      return response.data; // The actual data returned by the API
    } catch (error) {
      throw new Error(
        `Error fetching current weather from query: ${error.message}`
      );
    }
  }
};

export const fetch8DaysWeather = async () => {
  if (appConfig.useMockData) {
    throw new Error(
      `using mock data`
    );
  } else {
    try {
      const apiUrl = `${appConfig.APIAddress}/api/fetch-weather/coming-week/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("fetching new coming week Weather");
      // Return the response data (not `response.data` if you want only the results)
      return response.data; // The actual data returned by the API
    } catch (error) {
      throw new Error(
        `Error fetching current weather from query: ${error.message}`
      );
    }
  }
};

export const fetchCurrentTime = async () => {
  if (appConfig.useMockData) {
    throw new Error(
      `using mock data`
    );
  } else {
    try {
      const apiUrl = `${appConfig.APIAddress}/api/fetch-time/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("fetching new currentTime");
      // Return the response data (not `response.data` if you want only the results)
      return response.data; // The actual data returned by the API
    } catch (error) {
      throw new Error(
        `Error fetching current weather from query: ${error.message}`
      );
    }
  }
};

export const fetchCountries = async () => {
  if (appConfig.useMockData) {
    throw new Error(
      `using mock data`
    );
  }
}

export const fetchLocationData = async () => {
  if (appConfig.useMockData) {
    throw new Error(
      `using mock data`
    );
  } else {
    try {
      const apiUrl = `${appConfig.APIAddress}/location/data`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("fetching new location data");
      return response.data; // The actual data returned by the API
    } catch (error) {
      throw new Error(
        `Error fetching location data: ${error.message}`
      );
    }
  }
};
