import * as React from "react";

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
  return (
    <ThemeProvider theme={weatherMeTheme}>
      <CssBaseline />
      <>
        <NavigationBar />
        <Container maxWidth="sm" elevation={0}>
          <Box>
            <Stack id="stackOfStacks" direction="column" spacing={6}>
              <UserManager />
              <CardManager />
            </Stack>
          </Box>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default WeatherMeApp;
