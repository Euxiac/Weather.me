import * as React from 'react';
import { useState, useEffect } from 'react';
import * as appConfig from '../../appConfig';
import mock_location from '../../data/mock_location.json';
import * as DataUtils from '../../utilities/DataUtils';
import { fetchCoordinates, fetchCurrentWeather } from '../../services/apiService';
import mock_coordinates from '../../data/mock_coordinates.json';

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
    RadioGroup
} from '@mui/material';

//Form to change Name, stored in sessionStorage
export const NameForm = (resetManager) => {
    const [name, setName] = useState(
        // This makes two calls to storage. Maybe use a function and call that function in useState
        //? useState(getUserName())
        appConfig.storageMode.getItem('userName') ? appConfig.storageMode.getItem('userName') : ''
    );

    // Handle input change
    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    // Handle form submit
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (name) {
            appConfig.storageMode.setItem('userName', name);
            resetManager.resetManager();
        }
    };

    // Use a <form>
    return (
        <Stack direction="column" spacing={2}>
            <form onSubmit={handleSubmit}>
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
                    type="submit"
                    //updateUserName(false);
                >
                    Save Name
                </Button>
            </form>
        </Stack>
    );
};

//Form to change Location, stored in sessionStorage
export const LocationForm = (props) => {
    const [country, setCountry] = useState(
        appConfig.storageMode.getItem('userCountry')
            ? appConfig.storageMode.getItem('userCountry')
            : ''
    );
    const [state, setState] = useState(
        appConfig.storageMode.getItem('userState') ? appConfig.storageMode.getItem('userState') : ''
    );
    const [city, setCity] = useState(
        appConfig.storageMode.getItem('userCity') ? appConfig.storageMode.getItem('userCity') : ''
    );

    //this is where they will get the information from
    const countries = appConfig.useMockData
        ? mock_location
        : JSON.parse(appConfig.storageMode.getItem('location_data'));
    const states = country ? countries[country - 1].states : null;
    const cities = state ? states[state - 1].cities : null;

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
    const handleSubmit = async () => {
        if (country && state && city) {
            appConfig.storageMode.setItem('userCountry', country);
            appConfig.storageMode.setItem('userState', state);
            appConfig.storageMode.setItem('userCity', city);
            const countryCode = countries[country - 1].code;
            const stateName = countries[country - 1].states[state - 1].state;
            const coords = appConfig.useMockData
                ? mock_coordinates
                : await fetchCoordinates(countryCode, stateName, city);
            appConfig.storageMode.setItem('userCoordinates', JSON.stringify(coords));
            //console.log(JSON.parse(appConfig.storageMode.getItem('userCoordinates')));
            appConfig.storageMode.removeItem('time');
            //console.log(appConfig.storageMode.getItem("time"));
            props.resetManager();
            props.callBack(city);
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
                helperText="Limited countries are currently supported">
                {countries.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {DataUtils.capitalizeWords(option.country)}
                    </MenuItem>
                ))}
            </TextField>

            <Stack direction="row" spacing={2}>
                {states ? (
                    <TextField
                        select
                        label="Select State"
                        variant="outlined"
                        value={state}
                        onChange={handleInputChangeState}
                        margin="normal"
                        autoCapitalize="words"
                        helperText="Please select your state"
                        sx={{ width: '50%' }}>
                        {states.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {DataUtils.capitalizeWords(option.state)}
                            </MenuItem>
                        ))}
                    </TextField>
                ) : null}

                {cities ? (
                    <TextField
                        select
                        label="Select City"
                        variant="outlined"
                        value={city}
                        onChange={handleInputChangeCity}
                        margin="normal"
                        autoCapitalize="words"
                        helperText="Please select your city"
                        sx={{ width: '50%' }}>
                        {cities.map((option) => (
                            <MenuItem key={option.id} value={option.city}>
                                {DataUtils.capitalizeWords(option.city)}
                            </MenuItem>
                        ))}
                    </TextField>
                ) : null}
            </Stack>
            <Button
                variant="outlined"
                onClick={handleSubmit}
                //updateUserName(false);
            >
                Save Location
            </Button>
        </Stack>
    );
};

//Form to change Units, stored in sessionStorage
export const UnitForm = (resetWidget) => {
    const [unit, setUnit] = useState(
        appConfig.storageMode.getItem('unit') ? appConfig.storageMode.getItem('unit') : ''
    );

    const units = [
        {
            value: '0',
            label: 'Metric'
        },
        {
            value: '1',
            label: 'Imperial'
        }
    ];

    // Handle input change
    const handleInputChangeUnit = (event) => {
        setUnit(event.target.value);
    };

    // Handle form submit
    const handleSubmit = () => {
        if (unit) {
            appConfig.storageMode.setItem('unit', unit);
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
                    onChange={handleInputChangeUnit}>
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
