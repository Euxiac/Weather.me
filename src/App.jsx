import * as React from "react";
import { useEffect, useState } from "react";

import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import NavigationBar from "./components/basic/NavigationBar";
import Widget_Header from "./components/widgets/Widget_Header";
import CardManager from "./components/basic/CardManager";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import UserManager from "./components/basic/UserManager";
import * as appConfig from "./appConfig";
import * as apiService from "./services/apiService";

const weatherMeTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ebb969",
    },
    secondary: {
      main: "#388e3c",
    },
    background: {
      paper: "#4C4A49",
      default: "#242526",
    },
    text: {
      primary: "#e6e6e6",
      secondary: "rgba(230,230,230,0.8)",
      disabled: "rgba(230,230,230,0.5)",
    },
  },
});

const WeatherMeApp = () => {
  const [locationName, setLocationName] = useState(0);

  const callBack = (city) => {
    console.log("check call app");
    setLocationName(city);
  };

  useEffect(() => {
    async function fetchData() {
    await apiService.getAuth();

    if (appConfig.storageMode.getItem("location_data") === null) {
      apiService
        .fetchLocationData()
        .then((res) => {
          const fetchData = res.countryData;
          appConfig.storageMode.setItem(
            "location_data",
            JSON.stringify(res.countryData)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  fetchData();
  }, []);
  //console.log(JSON.parse(appConfig.storageMode.getItem("location_data")));
  const city = appConfig.storageMode.getItem("userCity");
  return (
    <ThemeProvider theme={weatherMeTheme}>
      <CssBaseline />
      <>
        <NavigationBar />
        <Container maxWidth="sm" elevation={0}>
          <Box>
            <Stack id="stackOfStacks" direction="column" spacing={6}>
              <UserManager callBack={callBack} />
              {city? <CardManager /> : console.log("yes")}
            </Stack>
          </Box>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default WeatherMeApp;
