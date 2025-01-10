import { Card, Box, Stack, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useState } from 'react';
import * as formComponents from './forms';
import CloseIcon from '@mui/icons-material/Close';
import * as appConfig from '../../appConfig';
import * as DataUtils from '../../utilities/DataUtils';
import mock_location from '../../data/mock_location.json';

const INITIAL_MODE = 'initial';
const EDIT_MODE = 'edit';

//this manages the user details on the top of the page
const UserManager = (props) => {
    // #region members
    const [mode, setMode] = useState(INITIAL_MODE); //mode of the widget, (initial, edit)
    const dataLocation = appConfig.useMockData
        ? mock_location
        : JSON.parse(appConfig.storageMode.getItem(appConfig.LOCATION_DATA));

    // Session or local are always strings, so if you are storing a number make sure you cast it to a number before using
    const userCountryIndex = appConfig.storageMode.getItem(appConfig.USER_COUNTRY);
    // Also use zero-indexed ids
    const userCountryString = userCountryIndex
        ? dataLocation[parseInt(userCountryIndex) - 1].country
        : null;

    const userStateString = userCountryIndex
        ? dataLocation[parseInt(userCountryIndex) - 1].states[
              // Recommend pulling state as a variable first, as inline is harder to read
              parseInt(appConfig.storageMode.getItem(appConfig.USER_STATE)) - 1
          ].state
        : null;

    const userNameString = appConfig.storageMode.getItem(appConfig.USER_NAME);

    const callBack = (city) => {
        props.callBack(city);
    };

    //resets widget
    const resetManager = () => {
        setMode(INITIAL_MODE);
    };
    // #endregion

    //definition of widgets avaliable for header
    //! Remove the array, or make the array actually useful
    //? Display conditions, removing unused properties, looping through array etc..
    const headerWidgets = [
        {
            name: 'User Name',
            widget: (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Stack direction="row" spacing={1}>
                        {userNameString ? (
                            <Typography variant="h4">
                                Hello,{' '}
                                {DataUtils.capitalizeWords(
                                    appConfig.storageMode.getItem('userName')
                                )}
                            </Typography>
                        ) : (
                            <Typography variant="h4">Let's get started!</Typography>
                        )}
                        <IconButton
                            aria-label="HeaderEdit"
                            size="small"
                            fontSize="inherit"
                            onClick={() => setMode(EDIT_MODE)}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </Box>
            ),
            forms: [
                {
                    id: 0,
                    form: <formComponents.NameForm resetManager={resetManager} />
                }
            ]
        },
        {
            name: 'User Location',
            widget: (
                <Box display="flex" justifyContent="center" alignItems="center">
                    {userCountryIndex ? (
                        <Stack
                            id="stack_location"
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}>
                            <Typography variant="caption">
                                {DataUtils.capitalizeWords(
                                    appConfig.storageMode.getItem('userCity')
                                )}
                            </Typography>
                            <Typography variant="caption">
                                {DataUtils.capitalizeWords(userStateString)}
                            </Typography>
                            <Typography variant="caption">
                                {DataUtils.capitalizeWords(userCountryString)}
                            </Typography>
                        </Stack>
                    ) : (
                        <Typography variant="caption">please set your location</Typography>
                    )}
                </Box>
            ),
            forms: [
                {
                    id: 0,
                    form: (
                        <formComponents.LocationForm
                            callBack={callBack}
                            resetManager={resetManager}
                        />
                    )
                }
            ]
        }
    ];

    //defition of the card wrapper
    return (
        <Card
            elevation={0}
            sx={{
                minWidth: 275,
                margin: '16px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.0)',
                transition: 'height 2.0s ease'
            }}>
            <Stack direction="column" spacing={2} sx={{ pt: '48px' }}>
                {mode === INITIAL_MODE ? (
                    <>
                        {headerWidgets[0].widget}
                        {userNameString ? headerWidgets[1].widget : null}
                    </>
                ) : (
                    <>
                        <Stack
                            className="Card_Settings"
                            direction="row"
                            spacing={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'right',
                                alignItems: 'center',
                                height: '100%'
                            }}>
                            <IconButton
                                aria-label="CardBack"
                                size="large"
                                fontSize="large"
                                onClick={() => setMode(INITIAL_MODE)}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </Stack>

                        {headerWidgets[0].forms[0].form}
                        {userNameString ? headerWidgets[1].forms[0].form : null}
                    </>
                )}
            </Stack>
        </Card>
    );
};

export default UserManager;
