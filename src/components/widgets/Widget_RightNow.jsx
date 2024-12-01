import * as React from "react";
import { useState, useEffect } from "react";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { fetchCurrentWeather } from "../../services/apiService";
import mock_weather from "../../data/mock_weather.json";
import { UsingMockData_warning } from "../basic/Card_Alerts";
import returnIcon from "../../Utilities/returnIcon";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import * as TimeUtils from "../utility/TimeUtils";
import { Skeleton } from "@mui/material";

function Widget_RightNow() {
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

  useEffect(() => {
    //this is reused to fill in the info depending on the source determined
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

    //if no data or data is outdated, fetchCurrentWeather from API
    if (
      sessionStorage.getItem("weather_current") === null ||
      TimeUtils.MinuteIsCurrent() == false
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
      fillInfo(JSON.parse(sessionStorage.getItem("weather_current")));
    }
  }, []);

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
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={100} />
      )}
    </CardContent>
  );
}

export default Widget_RightNow;
