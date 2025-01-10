import * as React from 'react';

import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';

import LogoIcon from '../icons/LogoIcon';

export default function NavigationBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <LogoIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Weather.me
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
