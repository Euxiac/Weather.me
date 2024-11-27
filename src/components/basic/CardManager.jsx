import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  CardActionArea,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WidgetCard from "./WidgetCard"; // Import the WidgetCard component
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid"; // You can use the `uuid` library to generate unique IDs
import Drawer from "@mui/material/Drawer";

import Widget_RightNow from "../widgets/Widget_RightNow";
import Widget_Duck from "../widgets/Widget_Duck";
import Widget_ComingWeek from "../widgets/Widget_ComingWeek";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PetsIcon from "@mui/icons-material/Pets";

const CardManager = () => {
  const handleAddCard = (widgetEntry) => {
    addCard(availableWidgets[widgetEntry]);
    toggleDrawer(false)
  };

  const availableWidgets = [
    {
      name: "Weather Right Now",
      icon: <TodayIcon />,
      widget: <Widget_RightNow />,
      background: true,
      action: () => handleAddCard(0),
    },
    {
      name: "Coming Week Forecast",
      icon: <DateRangeIcon />,
      widget: <Widget_ComingWeek />,
      background: false,
      action: () => handleAddCard(1),
    },
    {
      name: "Duck",
      icon: <PetsIcon />,
      widget: <Widget_Duck />,
      background: true,
      action: () => handleAddCard(2),
    },
  ];

  const [cards, setCards] = useState([{ id: 1, widget: availableWidgets[2] }]);
  const [newCardContent, setNewCardContent] = useState(); // Track the new card's content

  // Function to handle removing a card by its id
  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id)); // Remove the card with the given id
  };
  // Function to handle adding a new card
  const addCard = (widgetEntry) => {
    const newCard = {
      id: uuidv4(), // Generate a unique ID for the new card
      widget: widgetEntry,
    };
    setCards((prevCards) => [...prevCards, newCard]); // Add new card to the state
    setNewCardContent(""); // Clear the input after adding the card
  };

  //--------------------------------------------------------------------------------
  // State to control the Drawer
  const [open, setOpen] = useState(false);

  // Function to toggle the Drawer open/close
  const toggleDrawer = (open) => {
    setOpen(open);
  };
  //onClick={() => toggleDrawer(true)}

  const CreationMenu = () => (
    <Drawer anchor="bottom" open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ minWidth: 275 }} role="presentation">
        <List>
          <ListItem>
            <Typography variant="h6">Add a new widget</Typography>
          </ListItem>
        </List>
        <Divider />
        <List>
          {availableWidgets.map((item, index) => (
            <div key={index}>
              <ListItem>
                <ListItemButton onClick={item.action}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              {/* Optional: Add a divider between items */}
              {index < availableWidgets.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Box>
    </Drawer>
  );
  return (
    <div>
      {/* List of Cards */}
      <Stack id="body_WidgetStack" direction="column" spacing={3} sx={{paddingBottom:50}}>
        {cards.map((card) => (
          <WidgetCard
            key={card.id}
            card={card} // Pass card data as props
            deleteCard={deleteCard} // Pass the deleteCard function as a prop
          />
        ))}

        {/* Add New Card Section */}
        <Card
          variant="outlined"
          elevation={0}
          sx={{
            minWidth: "275",
            border: "1px dashed rgba(0, 0, 0, 0.12)",
            background: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardActions>
            <IconButton
              aria-label="addCircle"
              size="large"
              onClick={() => toggleDrawer(true)}
            >
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </CardActions>
        </Card>
      </Stack>
      <CreationMenu />
    </div>
  );
};
export default CardManager;
