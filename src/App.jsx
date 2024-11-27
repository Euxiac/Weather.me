import * as React from "react";

import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import NavigationBar from "./components/basic/NavigationBar";
import AddCard from "./components/widgets/AddCard";
import Widget_RightNow from "./components/widgets/Widget_RightNow";
import Widget_Duck from "./components/widgets/Widget_Duck";
import Widget_ComingWeek from "./components/widgets/Widget_ComingWeek";
import Widget from "./components/basic/Widget";
import Widget_Header from "./components/widgets/Widget_Header";
import CustomCard from "./components/widgets/CustomCard";
import WidgetCard from "./components/basic/WidgetCard";
import CardManager from "./components/basic/CardManager";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
      paper: "rgba(230,230,230,0.1)",
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
              <Widget_Header />
              <CardManager/>
            </Stack>
          </Box>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default WeatherMeApp;
