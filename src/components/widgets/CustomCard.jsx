import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

const CustomCard = ({ title, initialContent, pressedContent, holdTime = 1000 }) => {
  const [content, setContent] = useState(initialContent);
  const [isHolding, setIsHolding] = useState(false);  // Track whether the user is holding
  const timerRef = useRef(null);  // Ref to store the timeout ID

  // Handle mouse down (or touch start)
  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      setIsHolding(true);
      setContent(pressedContent);  // Change content after holding for the defined time
    }, holdTime); // Set delay to `holdTime` (in ms)
  };

  // Handle mouse up (or touch end)
  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);  // Clear the timer if the user releases the mouse too soon
    }
    if (!isHolding) {
      // If holding was not detected, reset the content
      setContent(initialContent);
    }
    setIsHolding(false);  // Reset holding state
  };

  // Handle mouse leave (or touch end for cases where the user moves out of the card)
  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);  // Clear the timer if the user moves the mouse out
    }
    if (!isHolding) {
      setContent(initialContent);
    }
    setIsHolding(false);
  };

  return (
    <Card
      sx={{ maxWidth: 345, margin: '16px', borderRadius: '8px' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomCard;
