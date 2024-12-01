import { Card, Box, Stack, Typography, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useState } from "react";
import * as formComponents from "./forms";
import { Mode } from "@mui/icons-material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CloseIcon from '@mui/icons-material/Close';
import * as appConfig from "../../appConfig"

//this manages the user details on the top of the page
const UserManager = () => {
  const [mode, setMode] = useState("initial"); //mode of the widget, (initial, edit)

  //resets widget
  const resetManager = () => {
    setMode('initial');
  }
  
  //definition of widgets avaliable for header
  const headerWidgets = [
    {
      name: "User Name",
      widget: (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Stack direction="row" spacing={1}>
            <Typography variant="h4">Hello, {appConfig.storageMode.getItem("userName")}</Typography>
            <IconButton
              aria-label="HeaderEdit"
              size="small"
              fontSize="inherit"
              onClick={() => setMode("Edit")}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Box>
      ),
      forms: [{ id: 0, form: <formComponents.NameForm resetManager={resetManager} /> }],
    },
    {
      name: "User Location",
      widget: (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Stack
            id="stack_location"
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Typography variant="caption">{appConfig.storageMode.getItem('userCity')}</Typography>
            <Typography variant="caption">{appConfig.storageMode.getItem('userState')}</Typography>
            <Typography variant="caption">{appConfig.storageMode.getItem('userCountry')}</Typography>
          </Stack>
        </Box>
      ),
      forms: [{ id: 0, form: <formComponents.LocationForm resetManager={resetManager}/> }],
    },
  ];

  //definition of Content inside widget
  const Content = () => {
    // actual widget content : edit content
    if (mode === "initial") {
      return (
        <>
          {headerWidgets[0].widget}
          {headerWidgets[1].widget}
        </>
      );
    } else {
      return (
        <>
          <Stack
            className="Card_Settings"
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IconButton
              aria-label="CardBack"
              size="large"
              fontSize="large"
              onClick={() => setMode("initial")}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Stack>

          {headerWidgets[0].forms[0].form}
          {headerWidgets[1].forms[0].form}
        </>
      );
    }
  };

  //defition of the card wrapper
  return (
    <Card
      elevation={0}
      sx={{
        minWidth: 275,
        margin: "16px",
        borderRadius: "8px",
        background: "rgba(0, 0, 0, 0.0)",
        transition: "height 2.0s ease",
      }}
    >
      <Stack direction="column" spacing={2} sx={{ pt: "48px" }}>
        <Content />
      </Stack>
    </Card>
  );
};

export default UserManager;
