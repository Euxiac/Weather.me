import * as React from "react";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import { useFormControl } from '@mui/material/FormControl';

function Widget_Header() {
  const [name, setName] = useState("Luke");
  const [editState, setEditState] = useState(false);

  const Header_name = () => {
    return editState ? (
      <Stack direction="column" spacing={2} sx={{ pt: "48px" }}>
        <Box>
          <IconButton
            aria-label="Edit"
            size="small"
            onClick={() => {
              setEditState(false);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5">What's your name?</Typography>
          <TextField required id="outlined" defaultValue="Luke" />
        </Stack>
      </Stack>
    ) : (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ pt: "48px" }}
      >
        <Stack direction="row" spacing={1}>
          <Typography variant="h4">Hello, {name}</Typography>
          <IconButton
            aria-label="Edit"
            size="small"
            onClick={() => {
              setEditState(true);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    );
  };

  const Header_location = () => {
    const countries = [
      {
        value: "0",
        label: "Australia",
      }
    ];

    const states = [
      {
        value: "0",
        label: "Western Australia",
      },
      {
        value: "1",
        label: "Northern Territory",
      },
      {
        value: "2",
        label: "Victoria",
      }
    ];

    const cities = [
      {
        value: "0",
        label: "Perth",
      },
      {
        value: "1",
        label: "Melbourne",
      },
      {
        value: "2",
        label: "Sydney",
      },
      {
        value: "3",
        label: "Canberra",
      },
    ];
    return editState ? (
      <Stack direction="column" spacing={3}>
        <Typography variant="h5">Where are you located?</Typography>
        <TextField
          id="outlined-select-country"
          select
          label="Select Country"
          defaultValue="0"
          helperText="Please select your country"
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={2}>
        <TextField
          id="outlined-select-state"
          select
          label="Select State"
          defaultValue="0"
          helperText="Please select your state"
          sx ={{width:"50%"}}
        >
          {states.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select-city"
          select
          label="Select City"
          defaultValue="0"
          helperText="Please select your city"
          sx ={{width:"50%"}}
        >
          {cities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Stack>
        <Button
          variant="outlined"
          onClick={() => {
            setEditState(false);
          }}
        >
          Submit
        </Button>
      </Stack>
    ) : (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Stack
          id="stack_location"
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Typography variant="caption">Perth</Typography>
          <Typography variant="caption">WA</Typography>
          <Typography variant="caption">Australia</Typography>
        </Stack>
      </Box>
    );
  };

  return (
    <Stack id="header_WidgetStack" direction="column" spacing={2}>
      <Header_name />
      <Header_location />
    </Stack>
  );
}

export default Widget_Header;
