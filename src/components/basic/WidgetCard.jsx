import React, { useState, useRef } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardActionArea,
    Stack,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    Box,
    Typography,
    Divider
} from '@mui/material';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import * as formComponents from './forms';

// WidgetCard Component
const WidgetCard = ({ card, deleteCard }) => {
    // State and Refs Initialization
    const [cardHeight, setCardHeight] = useState('inherit');
    const [elevation, setElevation] = useState(1);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const initialContent = card.widget.widget;
    const [content, setContent] = useState(initialContent);
    const [isHolding, setIsHolding] = useState(false); // Track holding state
    const cardRef = useRef(null); // Ref for Card element
    const timerRef = useRef(null); // Ref for timer (to detect hold)
    const holdTime = 1000; // Time threshold for holding to show settings dialog
    const background = card.widget.background; // Whether or not card should have a background, passed from card data in CardManager
    const hasForm = card.widget.forms.length != 0 ? true : false;

    // Handle MouseDown or TouchStart (Start holding the card)
    const handleMouseDown = () => {
        timerRef.current = setTimeout(() => {
            setIsHolding(true);
            handleCardStateChange(cardToolsContent); // Change content after hold time
        }, holdTime);
    };

    // Handle MouseUp or TouchEnd (Stop holding)
    const handleMouseUp = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current); // Clear the timer if holding wasn't long enough
        }
        if (content === initialContent && !isHolding) {
            handleCardStateChange(initialContent); // Reset content if not held
        }
        setIsHolding(false); // Reset holding state
    };

    // Reset Widget to Initial Content
    const resetWidget = () => {
        handleCardStateChange(initialContent); // Reset to original content
    };

    // Delete Dialog - Open and Confirm/Delete
    const handleDeleteClickOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        resetWidget();
    };

    //when delete is confirmed in dialogue
    const handleDeleteConfirm = () => {
        setDeleteOpen(false);
        deleteCard(card.id); // Confirm delete and trigger card deletion
    };

    // so i couldnt figure out how to reset the form to initial content so this one replaces the contents of the form to pass resetWidget
    const addResetToForm = () => {
        if (card.widget.forms.length > 0) {
            if ((card.widget.forms[0].form = <formComponents.UnitForm />)) {
                card.widget.forms[0].form = <formComponents.UnitForm resetWidget={resetWidget} />;
            }
        }
    };
    addResetToForm();

    //Card Content for Forms (change settings of cards)
    const handleFormMode = () => {
        const formContent = (
            <CardContent
                sx={{
                    height: '100%',
                    background: background ? 'rgba(0, 0, 0, 0.0)' : '#4C4A49'
                }}>
                <Stack className="Card_Settings" direction="column" spacing={2}>
                    <Stack
                        className="Card_Settings"
                        direction="row"
                        spacing={2}
                        sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            height: '100%'
                        }}>
                        <IconButton
                            aria-label="CardBack"
                            size="large"
                            fontSize="large"
                            onClick={resetWidget}>
                            <ArrowCircleLeftIcon fontSize="inherit" />
                        </IconButton>

                        <Typography variant="">Widget Settings</Typography>
                    </Stack>

                    <Divider />

                    {card.widget.forms.map(({ id, form }) => (
                        <Box key={id}>{form}</Box>
                    ))}
                </Stack>
            </CardContent>
        );
        handleCardStateChange(formContent);
    };

    // Card Content for Settings (Tools for interacting with the card)
    const cardToolsContent = (
        <CardContent
            sx={{
                height: '100%',
                background: background ? 'rgba(0, 0, 0, 0.0)' : '#4C4A49'
            }}>
            <Stack
                className="Card_Settings"
                direction="row"
                spacing={2}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                <IconButton
                    aria-label="CardBack"
                    size="large"
                    fontSize="large"
                    onClick={resetWidget}>
                    <ArrowCircleLeftIcon fontSize="inherit" />
                </IconButton>

                <IconButton aria-label="CardReorder" size="large" fontSize="large" disabled>
                    <SwapVerticalCircleIcon fontSize="inherit" />
                </IconButton>

                <IconButton
                    aria-label="CardEdit"
                    size="large"
                    fontSize="large"
                    disabled={!hasForm}
                    onClick={hasForm ? handleFormMode : null}>
                    <BuildCircleIcon fontSize="inherit" />
                </IconButton>

                <IconButton
                    aria-label="CardDelete"
                    size="large"
                    fontSize="medium"
                    onClick={handleDeleteClickOpen}>
                    <CancelIcon fontSize="inherit" />
                </IconButton>
            </Stack>
        </CardContent>
    );

    // Handle Card State Change (Switch between content)
    const handleCardStateChange = (newContent) => {
        setContent(newContent); // Update content of the card
        if (newContent === cardToolsContent) {
            setCardHeight(cardRef.current.offsetHeight); // Set specific height if content changed
        } else {
            setCardHeight('inherit'); // Reset height to auto if original content
        }
    };

    // Delete Dialog Component
    const DeleteDialog = () => (
        <Dialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{'Delete widget?'}</DialogTitle>
            <DialogActions>
                <Button onClick={handleDeleteConfirm} autoFocus>
                    Yes
                </Button>
                <Button onClick={handleDeleteClose}>No</Button>
            </DialogActions>
        </Dialog>
    );

    // TOP LEVEL Card Component with Dynamic Content
    const CardWithContent = () => (
        <Card
            ref={cardRef}
            elevation={elevation}
            style={{ cursor: 'pointer' }}
            sx={{
                minWidth: 275,
                margin: '16px',
                borderRadius: '8px',
                height: cardHeight,
                background: background ? '#4C4A49' : 'rgba(0, 0, 0, 0.0)',
                transition: 'height 0.3s ease'
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}>
            {content}
        </Card>
    );

    // Return JSX with Card and Delete Dialog
    return (
        <>
            <CardWithContent />
            <DeleteDialog />
        </>
    );
};

export default WidgetCard;
