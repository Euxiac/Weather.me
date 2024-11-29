import React, { useState } from "react";
import {
  Card,
  CardActions,
  IconButton,
  Stack,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PetsIcon from "@mui/icons-material/Pets";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

// Widget components import
import Widget_RightNow from "../widgets/Widget_RightNow";
import Widget_ComingWeek from "../widgets/Widget_ComingWeek";
import Widget_Duck from "../widgets/Widget_Duck";
import WidgetCard from "./WidgetCard"; // WidgetCard component
import * as formComponents from "./forms";


//this manages the widget cards 
const CardManager = () => {
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false); // Drawer open state

  // Function to handle adding a new card
  const addCard = (widget) => {
    setCards((prevCards) => [...prevCards, { id: uuidv4(), widget }]);
    setOpen(false); // Close the drawer after adding
  };

  // Function to handle removing a card
  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  // Available widgets for the Drawer menu
  let availableWidgets = [
    {
      name: "Weather Right Now",
      icon: <TodayIcon />,
      background: true,
      widget: <Widget_RightNow />,
      forms: [{ id:0, name:"UnitForm", form:<formComponents.UnitForm/>}],
    },
    {
      name: "Coming Week Forecast",
      icon: <DateRangeIcon />,
      background: false,
      widget: <Widget_ComingWeek />,
      forms: [{id:0, name:"UnitForm", form:<formComponents.UnitForm />}],
    },
    {
      name: "Duck",
      icon: <PetsIcon />,
      background: true,
      widget: <Widget_Duck />,
      forms: [],
    },
  ];

  // Drawer toggle function
  const toggleDrawer = (isOpen) => setOpen(isOpen);

  // Drawer Menu component
  const CreationMenu = () => (
    <Drawer anchor="bottom" open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ minWidth: 275 }} role="presentation">
        <Typography variant="h6" sx={{ padding: 2 }}>
          Add a new widget
        </Typography>
        <Divider />
        <List>
          {availableWidgets.map((widget, index) => (
            <div key={index}>
              <ListItem>
                <ListItemButton onClick={() => addCard(widget)}>
                  <ListItemIcon>{widget.icon}</ListItemIcon>
                  <ListItemText primary={widget.name} />
                </ListItemButton>
              </ListItem>
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
      <Stack
        id="body_WidgetStack"
        direction="column"
        spacing={3}
        sx={{ paddingBottom: 50 }}
      >
        {cards.map(({ id, widget }) => (
          <WidgetCard key={id} card={{ id, widget }} deleteCard={deleteCard} />
        ))}

        {/* Add New Card Section */}
        <Card
          variant="outlined"
          elevation={0}
          sx={{
            minWidth: 275,
            border: "1px dashed rgba(255, 255, 255, 0.20)",
            background: "rgba(0, 0, 0, 0.1)",
            display: "flex", // Enable flexbox
            justifyContent: "center", // Center content horizontally
            alignItems: "center", // Center content vertically
            height: "100%"
          }}
        >
          <CardActions>
            <IconButton size="large" onClick={() => toggleDrawer(true)}>
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </CardActions>
        </Card>
      </Stack>

      {/* Creation Drawer for new widgets */}
      <CreationMenu />
    </div>
  );
};

export default CardManager;
