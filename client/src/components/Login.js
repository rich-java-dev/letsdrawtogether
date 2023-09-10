import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, TextField, Button, Card, CardContent } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    top: "33%",
    left: "33%",
    position: "absolute",
  },
  //   avatar: {
  //     width: "20vw",
  //     height: "20vw",
  //     maxWidth: "200px",
  //     maxHeight: "200px",
  //   },
  //   typography: {
  //     width: "70vw",
  //   },
  //   gap: {
  //     width: "5vw",
  //   },
  //   static_gaps: {
  //     width: "50px",
  //   },
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const gotoLink = (path) => history.push(path);

  const [userName, setUserName] = useState("");
  const [pw, setPw] = useState("");

  const updateUserName = (e) => {
    const val = e.target.value;
    setUserName(val);
  };

  const updatePw = (e) => {
    const val = e.target.value;
    setPw(val);
  };

  const loginButtonPerformed = async () => {
    console.log(userName);
    console.log(pw);

    fetch("https://drawing.richwhite.net/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ userName: userName, pw: pw }),
    })
      .then((res) => res.text())
      .then((text) => {
        alert(text);
        gotoLink("/profile");
      });
  };

  return (
    <div className={classes.root}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="filled-required"
                label="User"
                value={userName}
                onChange={updateUserName}
              />
            </div>

            <div>
              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={pw}
                onChange={updatePw}
              />
            </div>

            <div>
              <Button onClick={() => loginButtonPerformed()}>Log In</Button>
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
