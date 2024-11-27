import * as React from "react";
import { useState, useEffect } from "react";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { fetchCurrentWeather } from "../../services/apiService";
import mock_weather from "./mock_data/mock_weather.json";
import { UsingMockData_warning } from "./widget_components/Card_Alerts";
import returnIcon from "../../Utilities/returnIcon";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";

function Widget_RightNow() {
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

  useEffect(() => {
    //console.log("effect run on Right Now");
    fetchCurrentWeather()
      //.fetchRightNow returns a promise that will be fulfilled at some point and then it runs .then. Promise success
      .then((res) => {
        //console.log(res);
        const currData = res.data.current;
        setUsingMockData(false);
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
      })
      // you can also use .catch for in case your promise has errors. Promise fail
      .catch((err) => {
        console.log(err);
        //on catch use mock data instead
        const currData = mock_weather.current;
        const weatherData = currData.weather[0];
        setUsingMockData(true);
        setCurrentWeather({
          weather: weatherData.main,
          desc: weatherData.description,
          icon: weatherData.icon,
        });
        setCurrentTemperature({
          temperature: currData.temp,
          feels_like: currData.feels_like,
        });
      });
  }, []);

  return (
    <CardContent>
      {usingMockData ? <UsingMockData_warning /> : null}

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
              <Typography variant="overline">
                {currentWeather.weather}
              </Typography>
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
    </CardContent>
  );
}

export default Widget_RightNow;
