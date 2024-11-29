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

//Form to change Name, stored in sessionStorage
export const NameForm = (resetManager) => {
  const [name, setName] = useState(
    sessionStorage.getItem("userName") ? sessionStorage.getItem("userName") : ""
  );
  const [greeting, setGreeting] = useState("Hello, "); // State for the greeting message

  // Handle input change
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  // Handle form submit
  const handleSubmit = () => {
    if (name) {
      sessionStorage.setItem("userName", name);
      resetManager.resetManager();
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h5">What's your name?</Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        autoCapitalize="words"
      />
      <Button
        variant="outlined"
        onClick={handleSubmit}
        //updateUserName(false);
      >
        Change Name
      </Button>
    </Stack>
  );
};

//Form to change Location, stored in sessionStorage
export const LocationForm = (resetManager) => {
  const [country, setCountry] = useState(
    sessionStorage.getItem("userCountry")
      ? sessionStorage.getItem("userCountry")
      : ""
  );
  const [state, setState] = useState(
    sessionStorage.getItem("userState")
      ? sessionStorage.getItem("userState")
      : ""
  );
  const [city, setCity] = useState(
    sessionStorage.getItem("userCity") ? sessionStorage.getItem("userCity") : ""
  );

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

  // Handle input change
  const handleInputChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleInputChangeState = (event) => {
    setState(event.target.value);
  };

  const handleInputChangeCity = (event) => {
    setCity(event.target.value);
  };

  // Handle form submit
  const handleSubmit = () => {
    if (country && state && city) {
      sessionStorage.setItem("userCountry", country);
      sessionStorage.setItem("userState", state);
      sessionStorage.setItem("userCity", city);
      resetManager.resetManager();
    }
  };

  return (
    <Stack direction="column" spacing={3}>
      <Typography variant="h5">Where are you located?</Typography>
      <TextField
        select
        label="Select Country"
        variant="outlined"
        value={country}
        onChange={handleInputChangeCountry}
        fullWidth
        margin="normal"
        autoCapitalize="words"
        helperText="Limited countries are currently supported"
      >
        {countries.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Stack direction="row" spacing={2}>
        <TextField
          select
          label="Select State"
          variant="outlined"
          value={state}
          onChange={handleInputChangeState}
          margin="normal"
          autoCapitalize="words"
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
          select
          label="Select City"
          variant="outlined"
          value={city}
          onChange={handleInputChangeCity}
          margin="normal"
          autoCapitalize="words"
          helperText="Please select your city"
          sx={{ width: "50%" }}
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
        onClick={handleSubmit}
        //updateUserName(false);
      >
        Change Name
      </Button>
    </Stack>
  );
};


//Form to change Units, stored in sessionStorage
export const UnitForm = (resetWidget) => {
  const [unit, setUnit] = useState(
    sessionStorage.getItem("unit") ? sessionStorage.getItem("unit") : ""
  );

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

  // Handle input change
  const handleInputChangeUnit = (event) => {
    setUnit(event.target.value);
  };

  // Handle form submit
  const handleSubmit = () => {
    if (unit) {
      sessionStorage.setItem("unit", unit);
      resetWidget.resetWidget();
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Units</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={unit}
          onChange={handleInputChangeUnit}
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
        onClick={handleSubmit} // Call the handleSubmit function correctly
      >
        Change Units
      </Button>
    </Stack>
  );
};


export default NameForm;
