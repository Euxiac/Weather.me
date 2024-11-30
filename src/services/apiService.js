import axios from "axios";

const mockData = false;

// {} => destructuring, when you have an object and just want one thing out of that object
const location = { lat: -31.9558933, lon: 115.8605855 };

export const fetchCurrentWeather = async () => {
  if (mockData) {
    throw new Error(
      `using mock data`
    );
  } else {
    try {
      const apiUrl = `http://localhost:8000/api/fetch-weather/current/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
  if (mockData) {
    throw new Error(
      `using mock data`
    );
  } else {
    try {
      const apiUrl = `http://localhost:8000/api/fetch-weather/coming-week/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
  if (mockData) {
    throw new Error(
      `using mock data`
    );
  } else {
    try {
      const apiUrl = `http://localhost:8000/api/fetch-time/${location.lat},${location.lon}`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Return the response data (not `response.data` if you want only the results)
      return response.data; // The actual data returned by the API
    } catch (error) {
      throw new Error(
        `Error fetching current weather from query: ${error.message}`
      );
    }
  }
};
