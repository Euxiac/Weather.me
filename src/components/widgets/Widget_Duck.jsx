import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DuckIcon from '../icons/DuckIcon';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function Widget_Duck() {
    const [jokeText, setJokeText] = useState({ setup: '', punchline: '' });
    const getJoke = () => {
        axios
            .get(`https://official-joke-api.appspot.com/random_joke`)
            .then((res) => {
                setJokeText({ setup: res.data.setup, punchline: res.data.punchline });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <CardActions>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ flexGrow: 1 }}
                >
                    <IconButton aria-label="JokeMe" size="large" onClick={getJoke}>
                        <DuckIcon />
                    </IconButton>
                </Box>
            </CardActions>
            <CardContent sx={{ pt: 0 }}>
                <Stack
                    direction="column"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    spacing={1}
                >
                    {jokeText.setup || jokeText.punchline ? (
                        <>
                            <Typography variant="h6">"{jokeText.setup}"</Typography>
                            <Typography variant="body1">{jokeText.punchline} *quack*</Typography>
                        </>
                    ) : (
                        <Typography variant="caption">I wonder what this duck does...</Typography>
                    )}
                </Stack>
            </CardContent>
        </>
    );
}

export default Widget_Duck;
