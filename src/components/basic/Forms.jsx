import * as React from "react";
import { useState, useEffect } from "react";


import {
  Button,
  CardContent,
  Stack,
  IconButton,
  MenuItem,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const NameForm = () => {
  const [name, setName] = useState("Luke");

  return (
      <Stack direction="column" spacing={2}>
        <Typography variant="h5">What's your name?</Typography>
        <TextField required id="outlined" defaultValue="Luke" />
      </Stack>
  );
}

export const LocationForm= () => {
  const countries = [
    {
      value: "0",
      label: "Australia",
    },
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
    },
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

  return (
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
          sx={{ width: "50%" }}
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
          sx={{ width: "50%" }}
        >
          {cities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
        variant="outlined"
        onClick={() => {
          setEditState(false);
        }}
      >
        Change Location
      </Button>
      </Stack>
    </Stack>
  );
}

export const UnitForm = () => {
  const units = [
    {
      value: "0",
      label: "Metric",
    },
    {
      value: "1",
      label: "Imperial",
    },
  ];
  return (
    <Stack direction="column" spacing={2}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Units</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {units.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button
        variant="outlined"
        onClick={() => {
          setEditState(false);
        }}
      >
        Change Units
      </Button>
    </Stack>
  );
}

export default NameForm;
