import { Card, Box, Stack, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useState } from 'react';
import * as formComponents from './forms';
import { Mode } from '@mui/icons-material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CloseIcon from '@mui/icons-material/Close';
import * as appConfig from '../../appConfig';
import * as DataUtils from '../../utilities/DataUtils';
import mock_location from '../../data/mock_location.json';

//this manages the user details on the top of the page
const UserManager = (props) => {
    const [mode, setMode] = useState('initial'); //mode of the widget, (initial, edit)
    const dataLocation = appConfig.useMockData
        ? mock_location
        : JSON.parse(appConfig.storageMode.getItem('location_data'));
    const userLocationData = appConfig.storageMode.getItem('userCountry');
    const userCountryString = userLocationData ? dataLocation[userLocationData - 1].country : null;
    const userStateString = userLocationData
        ? dataLocation[userLocationData - 1].states[appConfig.storageMode.getItem('userState') - 1]
              .state
        : null;
    const userNameString = appConfig.storageMode.getItem('userName');

    const callBack = (city) => {
        //console.log("check call");
        props.callBack(city);
    };

    //resets widget
    const resetManager = () => {
        setMode('initial');
    };

    //definition of widgets avaliable for header
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
                                    appConfig.storageMode.getItem('userName'),
                                )}
                            </Typography>
                        ) : (
                            <Typography variant="h4">Let's get started!</Typography>
                        )}
                        <IconButton
                            aria-label="HeaderEdit"
                            size="small"
                            fontSize="inherit"
                            onClick={() => setMode('Edit')}
                        >
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                </Box>
            ),
            forms: [{ id: 0, form: <formComponents.NameForm resetManager={resetManager} /> }],
        },
        {
            name: 'User Location',
            widget: (
                <Box display="flex" justifyContent="center" alignItems="center">
                    {userLocationData ? (
                        <Stack
                            id="stack_location"
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}
                        >
                            <Typography variant="caption">
                                {DataUtils.capitalizeWords(
                                    appConfig.storageMode.getItem('userCity'),
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
                    ),
                },
            ],
        },
    ];

    //definition of Content inside widget
    const Content = () => {
        // actual widget content : edit content
        if (mode === 'initial') {
            return (
                <>
                    {headerWidgets[0].widget}
                    {userNameString ? headerWidgets[1].widget : null}
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
                            display: 'flex',
                            justifyContent: 'right',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <IconButton
                            aria-label="CardBack"
                            size="large"
                            fontSize="large"
                            onClick={() => setMode('initial')}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>

                    {headerWidgets[0].forms[0].form}
                    {userNameString ? headerWidgets[1].forms[0].form : null}
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
                margin: '16px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.0)',
                transition: 'height 2.0s ease',
            }}
        >
            <Stack direction="column" spacing={2} sx={{ pt: '48px' }}>
                <Content />
            </Stack>
        </Card>
    );
};

export default UserManager;
