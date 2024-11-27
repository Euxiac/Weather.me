import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SettingsIcon from "@mui/icons-material/Settings";

//look at passing content using props
// you can pass several props to thing but you will recieve them all in one prop package

function Widget({ children }) {
  const [toolbar, setToolbar] = useState(false);

  const Toolbar = ({openState}) => {
    setToolbar(openState);

    const contracted = <CardActions>
        <IconButton aria-label="Settings" size="small">
          <SettingsIcon fontSize="small" />
        </IconButton>
    </CardActions>;

    const expanded = <CardActions>
    <IconButton aria-label="PlaylistAddCircleIcon" size="small">
      <PlaylistAddCircleIcon fontSize="small" />
    </IconButton>

    <IconButton aria-label="BuildCircleIcon" size="small">
      <BuildCircleIcon fontSize="small" />
    </IconButton>

    <IconButton aria-label="RemoveCircleIcon" size="small">
      <RemoveCircleIcon fontSize="small" />
    </IconButton>
  </CardActions>;

    if(toolbar)return expanded
    else return contracted;
  };

  return (
    <Card elevation={1} sx={{ minWidth: 275 }}>
      {children}
    </Card>
  );
}

export default Widget;
