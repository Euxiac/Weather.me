import axios from "axios";
import * as appConfig from "../appConfig";
import mock_coordinates from "../data/mock_coordinates.json"

// {} => destructuring, when you have an object and just want one thing out of that object
let location = JSON.parse(appConfig.storageMode.getItem('userCoordinates'));

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
        `Error: ${error.message}`
      );
      break;
  }
}
export const fetchCurrentWeather = async () => {
  if (appConfig.useMockData) {
    throw new Error(`using mock data`);
  } else {
    try {
      location = JSON.parse(appConfig.storageMode.getItem('userCoordinates'));
      const apiUrl = `${appConfig.APIAddress}/api/fetch-weather/current/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log("fetching new currentWeather" + `${location.lat},${location.lon}`);
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
      console.log("fetching new coming week Weather"+ `${location.lat},${location.lon}`);
      // Return the response data (not `response.data` if you want only the results)
      return response.data; // The actual data returned by the API
    } catch (error) {
      return await handleError(error, fetch8DaysWeather);
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
      console.log("fetching new currentTime"+ `${location.lat},${location.lon}`);
      // Return the response data (not `response.data` if you want only the results)
      return response.data; // The actual data returned by the API
    } catch (error) {
      return await handleError(error, fetchCurrentTime);
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
      return await handleError(error, fetchCountries);
    }
  }
};

export const fetchCoordinates = async (country, state, city) => {
  if (appConfig.useMockData) {
    throw new Error(`using mock data`);
  } else {
  try {
    const apiUrl = `${appConfig.APIAddress}/location/query/${country}/${state}/${city}`;
    const response = await axios.get(apiUrl, {
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log("fetchin coordinates")
    const rawData = response.data.data[0];
    const formattedData = {"lat": rawData.lat, "lon": rawData.lon}
    console.log(formattedData)

    //sconsole.log(formattedData);
    return formattedData;
  } catch (error) {
    return await handleError(error, fetchCoordinates);
  }
}
};

export const getAuth = async () => {
  try {
    //console.log("start");
    const apiUrl = `${appConfig.APIAddress}/auth/get`;
    const response = await axios.get(apiUrl, {});
    //console.log("fetching new auth");
    appConfig.storageMode.setItem("user_token", response.data);
    //console.log(TOKEN);
  } catch (error) {
    return await handleError(error, getAuth);
  }
};

export const convertCountryName = async (targetFormat, query) => {
  if (appConfig.useMockData) {
    throw new Error(`using mock data`);
  } else {
  try {
    const apiUrl = `${appConfig.APIAddress}/location/convert/${targetFormat}/${query}`;
    const response = await axios.get(apiUrl, {
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    
    switch (targetFormat) {
      case 'country_name':
        return response.data.data[0].country_name;

        case 'iso3':
          return response.data.data[0].iso3;
    
      default:
        console.log(`invalid target format : ${targetFormat}`);
        break;
    }
  } catch (error) {
    return await handleError(error, convertCountryName);
  }
}
};
