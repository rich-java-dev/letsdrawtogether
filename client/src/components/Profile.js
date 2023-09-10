import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, TextField, Button, Card, CardContent } from "@material-ui/core";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  root: {
    // display: "flex",
    // top: "33%",
    // left: "33%",
    // position: "absolute",
  },
});

const Profile = () => {
  const classes = useStyles();

  const [message, setMessage] = useState("");

  const getServerMessage = () => {
    fetch("https://drawing.richwhite.net/api/profile")
      .then((res) => res.text())
      .then((text) => setMessage(text))
      .catch((e) => console.log(e));
  };

  useEffect(() => getServerMessage());

  return <div className={classes.root}>{message}</div>;
};

export default Profile;
