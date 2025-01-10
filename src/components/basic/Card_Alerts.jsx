import { Alert, Box } from '@mui/material';

export const Card_Alerts = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Alert severity="warning">This widget is currently using mock data</Alert>
        </Box>
    );
};
