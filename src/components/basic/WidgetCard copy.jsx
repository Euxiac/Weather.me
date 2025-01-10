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
    Box
} from '@mui/material';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SettingsIcon from '@mui/icons-material/Settings';

// WidgetCard Component
const WidgetCard = ({ card, deleteCard }) => {
    // State and Refs Initialization
    const [cardHeight, setCardHeight] = useState('inherit');
    const [elevation, setElevation] = useState(1);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [cardMode, setCardMode] = useState('initial');
    const initialContent = card.widget.widget;
    const [content, setContent] = useState(initialContent);
    const [isHolding, setIsHolding] = useState(false); // Track holding state
    const cardRef = useRef(null); // Ref for Card element
    const timerRef = useRef(null); // Ref for timer (to detect hold)
    const holdTime = 1000; // Time threshold for holding to show settings dialog
    const background = card.widget.background; // Whether or not card should have a background, passed from card data in CardManager

    // Handle MouseDown or TouchStart (Start holding the card)
    const handleMouseDown = () => {
        timerRef.current = setTimeout(() => {
            setIsHolding(true);
            handleCardModeChange('tools'); // Change content after hold time
        }, holdTime);
    };

    // Handle MouseUp or TouchEnd (Stop holding)
    const handleMouseUp = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current); // Clear the timer if holding wasn't long enough
        }
        if (cardMode === 'initial' && !isHolding) {
            handleCardModeChange('initial'); // Reset content if not held
        }
        setIsHolding(false); // Reset holding state
    };

    // Handle Card State Change (Switch between content)
    const handleCardModeChange = (newMode) => {
        setCardMode(newMode); // Update mode of the card
        if (newMode === 'initial') {
            setCardHeight('inherit'); // Reset height to auto if original content
        } else {
            setCardHeight(cardRef.current.offsetHeight); // Set specific height if content changed
        }
    };

    // Reset Widget to Initial Content
    const resetWidget = () => {
        handleCardModeChange('initial'); // Reset to original content
    };

    // Delete Dialog - Open and Confirm/Delete
    const handleDeleteClickOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        resetWidget();
    };

    const handleDeleteConfirm = () => {
        setDeleteOpen(false);
        deleteCard(card.id); // Confirm delete and trigger card deletion
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
                    aria-label="ArrowCircleLeftIcon"
                    size="large"
                    fontSize="large"
                    onClick={resetWidget}>
                    <ArrowCircleLeftIcon fontSize="inherit" />
                </IconButton>

                <IconButton aria-label="ArrowCircleLeftIcon" size="large" fontSize="large" disabled>
                    <SwapVerticalCircleIcon fontSize="inherit" />
                </IconButton>

                <IconButton aria-label="ArrowCircleLeftIcon" size="large" fontSize="large" disabled>
                    <BuildCircleIcon fontSize="inherit" />
                </IconButton>

                <IconButton
                    aria-label="ArrowCircleLeftIcon"
                    size="large"
                    fontSize="medium"
                    onClick={handleDeleteClickOpen}>
                    <CancelIcon fontSize="inherit" />
                </IconButton>
            </Stack>
        </CardContent>
    );

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

    const WidgetBody = () => {
        return (
            <>
                <Box
                    className="widgetBody"
                    sx={{
                        visibility: cardMode == 'initial' ? 'initial' : 'hidden',
                        height: cardMode == 'initial' ? 'inherit' : 0
                    }}>
                    {initialContent}
                </Box>
                <Box
                    className="cardToolsBody"
                    sx={{
                        visibility: cardMode == 'tools' ? 'initial' : 'hidden',
                        height: cardMode == 'tools' ? 'inherit' : 0
                    }}>
                    {cardToolsContent}
                </Box>
                <Box
                    className="cardFormBody"
                    sx={{
                        visibility: cardMode == 'form' ? 'initial' : 'hidden',
                        height: cardMode == 'tools' ? 'inherit' : 0
                    }}>
                    <p>form</p>
                </Box>
            </>
        );
    };

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
            <WidgetBody />
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
