import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Container from '@mui/material/Container';

//widget to add a new card
function AddCard() {
    return (
        <Card
            variant="outlined"
            elevation={0}
            sx={{
                minWidth: '275',
                border: '1px dashed rgba(0, 0, 0, 0.12)',
                background: 'rgba(0, 0, 0, 0.1)'
            }}>
            <CardActions>
                <IconButton aria-label="addCircle" size="large">
                    <AddCircleIcon fontSize="inherit" />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default AddCard;
