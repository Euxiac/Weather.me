import React, { useState, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import SettingsIcon from "@mui/icons-material/Settings";
import Stack from "@mui/material/Stack";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const WidgetCard = ({ card, deleteCard }) => {
  const background = card.widget.background;
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const holdTime = 1000;
  const initialContent = card.widget.widget;
  const [content, setContent] = useState(initialContent);
  const [isHolding, setIsHolding] = useState(false); // Track whether the user is holding
  const timerRef = useRef(null); // Ref to store the timeout ID

  // Delete Dialog ----------------------------------------------------------------------------------------

  const handleDeleteClickOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    resetWidget();
  };

  const handleDeleteConfirm = () => {
    setDeleteOpen(false);
    deleteCard(card.id);
  };

  const resetWidget = () => {
    setContent(initialContent);
  };

  const DeleteDialog = () => (
    <Dialog
      open={deleteOpen}
      onClose={handleDeleteClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete widget?"}</DialogTitle>
      <DialogActions>
        <Button onClick={handleDeleteConfirm} autoFocus>
          Yes
        </Button>
        <Button onClick={handleDeleteClose}>No</Button>
      </DialogActions>
    </Dialog>
  );

  // Hold to access settings ---------------------------------------------------------------------------------

  const pressedContent = (
    <CardContent>
      <CardActionArea>
        <Stack className="Card_Settings" direction="row" spacing={3} sx={{display: "flex", // Enable flexbox
        justifyContent: "center", // Center content horizontally
        alignItems: "center", // Center content vertically
        height: "100%"}}>
          <ArrowCircleLeftIcon
            aria-label="ArrowCircleLeftIcon"
            size="large"
            fontSize="large"
            onClick={resetWidget}
          />

          <SwapVerticalCircleIcon
            aria-label="SwapVerticalCircleIcon"
            size="large"
            fontSize="large"
          />

          <BuildCircleIcon
            aria-label="BuildCircleIcon"
            size="large"
            fontSize="large"
          />

          <CancelIcon
            aria-label="CancelIcon"
            size="large"
            fontSize="large"
            onClick={handleDeleteClickOpen}
          />
        </Stack>
      </CardActionArea>
    </CardContent>
  );

  // Handle mouse down (or touch start)
  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      setIsHolding(true);
      setContent(pressedContent); // Change content after holding for the defined time
    }, holdTime); // Set delay to `holdTime` (in ms)
  };

  // Handle mouse up (or touch end)
  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // Clear the timer if the user releases the mouse too soon
    }
    if (content === initialContent && !isHolding) {
      // If holding was not detected, reset the content
      setContent(initialContent);
    }
    setIsHolding(false); // Reset holding state
  };

  const CardWithContent = () => (
    <Card
      elevation={1}
      sx={{
        minWidth: 275,
        margin: "16px",
        borderRadius: "8px",
        background: background ? "#4C4A49" : "rgba(0, 0, 0, 0.0)",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {content}
    </Card>
  );

  return (
    <>
      <CardWithContent />
      <DeleteDialog />
    </>
  );
};

export default WidgetCard;
