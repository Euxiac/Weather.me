import React, { useState } from 'react';
import {
    Stack,
    Typography,
    IconButton,
    Box,
    Divider,
    TextField,
    Button,
    MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

// LocationSelect - a reusable component for rendering dropdowns
const LocationSelect = ({ label, value, options, onChange }) => (
    <TextField
        select
        label={label}
        value={value}
        onChange={onChange}
        helperText={`Please select your ${label.toLowerCase()}`}
        fullWidth>
        {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
    </TextField>
);

// NameHeader - Handles the name input and display logic
const NameHeader = ({ name, onEdit, onClose }) => (
    <Stack direction="column" spacing={2} sx={{ pt: '48px' }}>
        <Box>
            <IconButton aria-label="Edit" size="small" onClick={onClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Box>
        <Stack direction="column" spacing={2}>
            <Typography variant="h5">What's your name?</Typography>
            <TextField required defaultValue={name} />
        </Stack>
    </Stack>
);

// LocationHeader - Handles the location input and display logic
const LocationHeader = ({ editState, setEditState }) => {
    const countries = [{ value: '0', label: 'Australia' }];
    const states = [
        { value: '0', label: 'Western Australia' },
        { value: '1', label: 'Northern Territory' },
        { value: '2', label: 'Victoria' }
    ];
    const cities = [
        { value: '0', label: 'Perth' },
        { value: '1', label: 'Melbourne' },
        { value: '2', label: 'Sydney' },
        { value: '3', label: 'Canberra' }
    ];

    const [country, setCountry] = useState('0');
    const [state, setState] = useState('0');
    const [city, setCity] = useState('0');

    const handleSubmit = () => {
        // Handle submit logic (you can store the data, etc.)
        setEditState(false);
    };

    return editState ? (
        <Stack direction="column" spacing={3}>
            <Typography variant="h5">Where are you located?</Typography>
            <LocationSelect
                label="Country"
                value={country}
                options={countries}
                onChange={(e) => setCountry(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
                <LocationSelect
                    label="State"
                    value={state}
                    options={states}
                    onChange={(e) => setState(e.target.value)}
                />
                <LocationSelect
                    label="City"
                    value={city}
                    options={cities}
                    onChange={(e) => setCity(e.target.value)}
                />
            </Stack>
            <Button variant="outlined" onClick={handleSubmit}>
                Submit
            </Button>
        </Stack>
    ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}>
                <Typography variant="caption">Perth</Typography>
                <Typography variant="caption">WA</Typography>
                <Typography variant="caption">Australia</Typography>
            </Stack>
        </Box>
    );
};

function Widget_Header() {
    const [name, setName] = useState('Luke');
    const [editState, setEditState] = useState(false);

    return (
        <Stack id="header_WidgetStack" direction="column" spacing={2}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: '48px' }}>
                <Stack direction="row" spacing={1}>
                    <Typography variant="h4">Hello, {name}</Typography>
                    <IconButton aria-label="Edit" size="small" onClick={() => setEditState(true)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Box>

            {editState ? (
                <NameHeader
                    name={name}
                    onEdit={() => setEditState(true)}
                    onClose={() => setEditState(false)}
                />
            ) : (
                <LocationHeader editState={editState} setEditState={setEditState} />
            )}
        </Stack>
    );
}

export default Widget_Header;
