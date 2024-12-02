import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import Widget_ComingWeek from "./Widget_ComingWeek";
import DuckIcon from "../icons/DuckIcon";

// Simple number guessing game component
const Widget_Game = () => {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1); // Random number between 1 and 100
  const [attempts, setAttempts] = useState(0);

  // Handle the guess input change
  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  // Handle the submit button click
  const handleGuessSubmit = () => {
    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess)) {
      setMessage("Please enter a valid number.");
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === targetNumber) {
      setMessage(
        `Correct! You guessed the number in ${attempts + 1} attempts.`
      );
    } else if (userGuess < targetNumber) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Too high! Try again.");
    }
  };

  // Handle resetting the game
  const handleResetGame = () => {
    setGuess("");
    setMessage("");
    setAttempts(0);
  };

  return (
    <>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Duck Guessing Game
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          sx={{ flexGrow: 1, pt: 1.5, pb: 1.5 }}
        >
          <DuckIcon />
          <DuckIcon />
          <DuckIcon />
        </Box>
        <Typography variant="body1" align="center" gutterBottom>
          How many ducks are crossing the road? Guess a number between 1 and
          100.
        </Typography>

        <TextField
          label="Your Guess"
          variant="outlined"
          type="number"
          value={guess}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleGuessSubmit}
            sx={{ marginBottom: 2 }}
          >
            Submit Guess
          </Button>
        </Box>

        {message && (
          <Typography
            variant="h6"
            align="center"
            color={message.includes("Correct") ? "lime" : "red"}
          >
            {message}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleResetGame}
        >
          Reset Game
        </Button>
      </CardActions>
    </>
  );
};

export default Widget_Game;
