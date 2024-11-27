import * as React from "react";
import { useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Widget_Test() {
  const [dummyText, setDummyText] = useState("");
  const [dummyNumber, setDummyNumber] = useState(1, "");
  const test = () => {
    axios
      .get(`https://dummyjson.com/posts/${dummyNumber}`)
      .then((res) => {
        setDummyText(res.data.body);
        setDummyNumber(dummyNumber + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card elevation={2} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Test Widget
        </Typography>
          {dummyText ? <Typography variant="body1">{dummyNumber + ". " + dummyText}</Typography> : null}
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={test}>
          Click
        </Button>
      </CardActions>
    </Card>
  );
}

export default Widget_Test;
