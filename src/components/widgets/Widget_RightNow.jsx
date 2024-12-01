import * as React from "react";
import { useState, useEffect } from "react";

// Material-UI imports
import {
  CardContent,
  Typography,
  Stack,
  Box,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// Services and utilities
import { fetchCurrentWeather } from "../../services/apiService";
import * as TimeUtils from "../../utilities/TimeUtils";
import returnIcon from "../../utilities/returnIcon";

// Mock Data and Components
import mock_weather from "../../data/mock_weather.json";
import { UsingMockData_warning } from "../basic/Card_Alerts";

function Widget_RightNow() {
  // State variables
  const [dataAvailable, setDataAvailable] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("");
  const [usingMockData, setUsingMockData] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    weather: "",
    desc: "",
    icon: "",
  });
  const [currentTemperature, setCurrentTemperature] = useState({
    temperature: "",
    feels_like: "",
  });

  // Function to fill data from source (API or mock)
  const fillInfo = (source) => {
    const currData = source;
    const weatherData = currData.weather[0];
    setCurrentWeather({
      weather: weatherData.main,
      desc: weatherData.description,
      icon: weatherData.icon,
    });
    setCurrentTemperature({
      temperature: currData.temp,
      feels_like: currData.feels_like,
    });
    setDataAvailable(true);
  };

  // useEffect hook to handle data fetching or using mock data
  useEffect(() => {
    if (
      sessionStorage.getItem("weather_current") === null ||
      TimeUtils.MinuteIsCurrent() === false
    ) {
      fetchCurrentWeather()
        .then((res) => {
          const fetchData = res.data.current;
          sessionStorage.setItem(
            "weather_current",
            JSON.stringify(res.data.current)
          );
          setUsingMockData(false);
          fillInfo(JSON.parse(sessionStorage.getItem("weather_current")));
        })
        .catch((err) => {
          console.log(err);
          setUsingMockData(true);
          fillInfo(mock_weather.current);
        });
    } else {
      const currData = JSON.parse(sessionStorage.getItem("weather_current"));
      setUsingMockData(false);
      fillInfo(currData);
    }
  }, []);

  // JSX Rendering
  return (
    <CardContent>
      {usingMockData ? <UsingMockData_warning /> : null}

      {dataAvailable ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          sx={{ flexGrow: 1, pt: 1.5 }}
        >
          <Grid container spacing={3}>
            <Grid size={4.5}>
              <Stack
                direction="column"
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={0}
              >
                {returnIcon(currentWeather ? currentWeather.icon : null)}
                <Typography variant="caption">{currentWeather.desc}</Typography>
              </Stack>
            </Grid>
            <Grid size={7.5}>
              <Stack
                direction="column"
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={0}
              >
                <Typography variant="overline">{currentWeather.weather}</Typography>
                <Typography variant="h2">
                  {Math.round(currentTemperature.temperature)}°C
                </Typography>
                <Typography variant="body1">
                  feels like {Math.round(currentTemperature.feels_like)}°C
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={100} />
      )}
    </CardContent>
  );
}

export default Widget_RightNow;
