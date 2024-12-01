import * as React from "react";
import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { fetch8DaysWeather, fetchCurrentTime } from "../../services/apiService";
import mock_weather from "../../data/mock_weather.json";
import mock_time from "../../data/mock_time.json";
import { UsingMockData_warning } from "../basic/Card_Alerts";
import returnIcon from "../../Utilities/returnIcon";
import * as TimeUtils from "../utility/TimeUtils";
import Skeleton from "@mui/material/Skeleton";

function Widget_ComingWeek() {
  const weatherEntry = (day, data, ukey) => {
    return (
      <Card key={ukey} sx={{ minWidth: 160 }}>
        <Box
          direction="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: "grey", pt: 0.5, pb: 0.5 }}
        >
          <Typography variant="caption">{day}</Typography>
        </Box>
        <CardContent sx={{ pt: 0 }}>
          <Stack spacing={2}>
            <Box>
              <Stack spacing={2}>
                <Stack
                  direction="column"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  spacing={0.5}
                >
                  {returnIcon(data ? data.weather[0].icon : null)}
                  <Typography variant="subtitle2">
                    {data ? data.weather[0].main : "n/a"}
                  </Typography>
                  <Typography variant="caption">
                    {data ? data.summary : "n/a"}
                  </Typography>
                </Stack>
                <Stack
                  direction="column"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.5}
                >
                  <Typography variant="subtitle2">
                    Max {data ? data.temp.max : "n/a"}
                  </Typography>
                  <Typography variant="subtitle2">
                    Min {data ? data.temp.min : "n/a"}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  };

  const [dataAvailable, setDataAvailable] = useState(false);
  const [weatherArray, setWeatherArray] = useState("");
  const [timeAndDate, setTimeAndDate] = useState("");
  const daysOfWeek = [
    { 0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" },
  ];
  const [usingMockData, setUsingMockData] = useState(false);

  const CalculateDays = (today, daysFromToday) => {
    let result;
    switch (today) {
      case "Sunday":
        result = 0 + daysFromToday;
        break;
      case "Monday":
        result = 1 + daysFromToday;
        break;
      case "Tuesday":
        result = 2 + daysFromToday;
        break;
      case "Wednesday":
        result = 3 + daysFromToday;
        break;
      case "Thursday":
        result = 4 + daysFromToday;
        break;
      case "Friday":
        result = 5 + daysFromToday;
        break;
      case "Saturday":
        result = 6 + daysFromToday;
        break;
      default:
        break;
    }

    if (result > 6) {
      result = result - 6;
    }

    return result;
  };

  function populateComingWeekStack() {
    //console.log(`populate ${weatherArray[0]}`);
    if (dataAvailable) {
      return (
        <Stack
          id="Stack_ComingWeek"
          direction="row"
          spacing={2}
          sx={{ overflow: "auto" }}
        >
          {weatherEntry("Today", weatherArray[0], 0)}
          {weatherEntry("Tommorow", weatherArray[1], 1)}
          {weatherArray.map((daily, index) => {
            if (index === 0 || index === 1) return null;
            let day = CalculateDays(timeAndDate.day_of_week, index);
            let dayName = daysOfWeek[0][day];
            return weatherEntry(dayName, daily, index);
          })}
        </Stack>
      );
    } else {
      return (
        <CardContent>
        <Stack
          id="Stack_ComingWeek"
          direction="row"
          spacing={2}
          sx={{ overflow: "auto" }}
        >
          <Skeleton variant="rectangular" width={"30%"} height={300} />
          <Skeleton variant="rectangular" width={"30%"} height={300} />
          <Skeleton variant="rectangular" width={"30%"} height={300} />
        </Stack>
        </CardContent>
      );
    }
  }

  useEffect(() => {
    //console.log("effect run on Coming Week");
    const fillInfo = (source) => {
      const dataArray = source;
      let tempArr = [];
      for (let index = 0; index < dataArray.length; index++) {
        tempArr.push(dataArray[index]);
      }
      setWeatherArray(tempArr);
    };

    if (
      sessionStorage.getItem("weather_coming_week") === null ||
      TimeUtils.MinuteIsCurrent() == false
    ) {
      fetch8DaysWeather()
        .then((res) => {
          const fetchData = res.data.daily;
          setUsingMockData(false);
          sessionStorage.setItem(
            "weather_coming_week",
            JSON.stringify(res.data.daily)
          );
          fillInfo(JSON.parse(sessionStorage.getItem("weather_coming_week")));
          setTimeAndDate(JSON.parse(TimeUtils.GrabTime()).data);
          setDataAvailable(true);
        })
        .catch((err) => {
          setUsingMockData(true);
          fillInfo(mock_weather.daily);
          setTimeAndDate(mock_time);
          setDataAvailable(true);
        });
    } else {
      setUsingMockData(false);
      fillInfo(JSON.parse(sessionStorage.getItem("weather_coming_week")));
      setTimeAndDate(JSON.parse(TimeUtils.GrabTime()).data);
      setDataAvailable(true);
    }
  }, []);

  return (
    <>
      {usingMockData ? <UsingMockData_warning /> : null}
      {populateComingWeekStack()}
    </>
  );
}

export default Widget_ComingWeek;
